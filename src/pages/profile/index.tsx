import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Radio,
  Upload,
  Button,
  message,
  Descriptions,
  DescriptionsProps,
  Flex,
  Card,
} from 'antd';
import { useModel } from '@umijs/max';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';
import { updateUserInfo, uploadAvatar } from '@/services/ant-design-pro/api';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const beforeUpload = (file: FileType) => {
  // 1. 校验格式
  const isJpgOrJpegOrPng = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrJpegOrPng) {
    message.error('只能上传JPG/JPEG/PNG格式图片!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小超过了2MB!');
  }
  return isJpgOrJpegOrPng && isLt2M;
};

const getGender = (index: number | undefined) => {
  switch (index) {
    case 1:
      return '男'
    case 2:
      return '女'
    default:
      return '不愿透露'
  }
}


const Profile: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [edit, setEdit] = useState(false);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [form] = Form.useForm();
  const items: DescriptionsProps['items'] = React.useMemo(() => [
    {
      key: '1',
      label: '用户名',
      children: currentUser?.username,
    },
    {
      key: '2',
      label: '性别',
      children: getGender(currentUser?.gender),
    },
    {
      key: '3',
      label: '电话',
      children: currentUser?.phone,
    },
    {
      key: '4',
      label: '头像',
      span: 2,
      children: currentUser?.avatar && <img draggable={false} src={currentUser.avatar} alt="avatar" style={{ width: '100px' }} />,
    },
    {
      key: '5',
      label: '邮箱',
      children: currentUser?.email,
    },
  ], [currentUser]);

  // Show currentUser info in the form for user to edit them
  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        username: currentUser.username,
        gender: currentUser.gender,
        phone: currentUser.phone,
        email: currentUser.email,
      });
      setImageUrl(currentUser.avatar);
    }
  }, [currentUser, form]);

  const onFinish = async (values: any) => {
    // 封装成对象
    const { username, gender, phone, email } = values;
    const newUser = {
      username: username,
      gender: gender,
      phone: phone,
      email: email,
      avatar: imageUrl,
    }
    console.log('将要编辑后的信息', newUser);
    await updateUserInfo(newUser);
    setEdit(false);
    window.location.reload();
  };
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <PageContainer content='编辑你的个人信息'>
      <Flex vertical>
        <Button color="primary" variant="solid" style={{ width: '300px' }} onClick={() => setEdit(true)}>编辑</Button>
        <Descriptions title="个人信息" layout="horizontal" items={items} />
        {edit &&
          <Card>
            <Form
              form={form}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              style={{ maxWidth: 600 }}
              initialValues={{ gender: null }}
              onFinish={onFinish}
            >
              <Form.Item
                label="用户名"
                name="username"
                rules={[
                  {
                    type: 'string',
                    max: 20,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="性别" name='gender'>
                <Radio.Group>
                  <Radio value={1}> 男 </Radio>
                  <Radio value={2}> 女 </Radio>
                  <Radio value={3}> 不愿透露 </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="phone"
                label="电话"
                rules={[
                  { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请输入正确的手机号格式！' }
                ]}
              >
                <Input style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="头像">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  customRequest={async ({ file }) => {
                    const formData = new FormData();
                    formData.append('avatar', file);
                    const res = await uploadAvatar(formData);
                    // 成功 弹出提示
                    if (res.code === 0) {
                      message.success('上传成功！');
                      setImageUrl(res.data);
                    }
                    // 失败 
                  }}
                  beforeUpload={beforeUpload}
                >
                  {imageUrl ? (
                    <img draggable={false} src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  { pattern: /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.([a-zA-Z]{2,6})$/, message: '请输入正确的邮箱格式！' }
                ]}
              >
                <Input style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label={null}>
                <Button onClick={() => {
                  setEdit(false);
                  setImageUrl(currentUser?.avatar);
                }}>
                  取消
                </Button>
                {' '}
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Card>}
      </Flex>
    </PageContainer>
  );
};
export default Profile;
