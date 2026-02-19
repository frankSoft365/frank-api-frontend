import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Table, Card } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { batchImportUser } from '@/services/ant-design-pro/api';
import dayjs from 'dayjs';
import { PageContainer } from '@ant-design/pro-components';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const App: React.FC = () => {
    const [rows, setRows] = useState<API.CurrentUser[]>([]);
    const [file, setFile] = useState<UploadFile>();
    const [uploading, setUploading] = useState(false);
    const [showSuccessDetail, setShowSuccessDetail] = useState(false);
    const [showErrorDetail, setShowErrorDetail] = useState(false);
    const [errorMessageList, setErrorMessageList] = useState<string[]>([]);
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file as FileType);
        setUploading(true);
        const res = await batchImportUser(formData);
        if (res.data.isSuccess) {
            message.success('上传成功！');
            setUploading(false);
            res.data.succesList && setRows(res.data.succesList);
            setShowSuccessDetail(true);
        } else {
            message.error('上传失败！');
            setShowSuccessDetail(false);
            setFile(undefined);
            // clear ant Upload component's fileList to commend user to reload file from computer instead of directly clicking the upload if the user modify the original file that result file cache error 
            setFileList([]);
            setUploading(false);
            res.data.errorMessageList && setErrorMessageList(res.data.errorMessageList);
            setShowErrorDetail(true);
        }
    };

    const props: UploadProps = {
        onRemove: () => {
            setFile(undefined);
        },
        beforeUpload: (file: FileType) => {
            // check is the file is .xlsx or .xls as extension of file
            const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
            if (!isExcel) {
                message.error('Please upload only .xlsx or .xls files');
                return false;
            }
            setFile(file as UploadFile);
            return false;   // 返回false避免自动上传
        },
        maxCount: 1,
        fileList: fileList,
        onChange: ({ fileList: newFileList }) => {
            setFileList(newFileList); // 3. 组件内部变化时，更新状态
        }
    };

    const getGender = (index: number) => {
        switch (index) {
            case 1:
                return '男'
            case 2:
                return '女'
            default:
                return '未设置'
        }
    }
    const columns = [
        {
            title: '序号',
            key: 'index',
            render: (_text: any, _record: any, index: number) => index + 1,
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '账户名',
            dataIndex: 'userAccount',
            key: 'userAccount',
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            render: (_text: any, _record: any, index: number) => getGender(_record.gender),
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_text: any, _record: any, index: number) => <img src={_record.avatar} alt="avatar" style={{ width: 40 }} />
        },
        {
            title: '注册时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (_text: any, _record: any, index: number) => dayjs(_record.createTime).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '用户状态',
            dataIndex: 'userStatus',
            key: 'userStatus',
            render: (_text: any, _record: any, index: number) => _record.userStatus === 1 && '正常',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '用户权限',
            dataIndex: 'role',
            key: 'role',
            render: (_text: any, _record: any, index: number) => _record.role === 0 ? '普通用户' : '管理员',
        },
    ];

    return (
        <PageContainer>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>上传一个 .xlsx 或 .xls 文件</Button>
            </Upload>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={!file}
                loading={uploading}
                style={{ marginTop: 16, marginBottom: 24, width: "200px" }}
            >
                {uploading ? '上传中...' : '开始上传'}
            </Button>
            {showSuccessDetail &&
                <Card title="已上传的用户信息详情：" variant="borderless" style={{ width: "100%", marginBottom: 24 }}>
                    <Table dataSource={rows} columns={columns} />
                </Card>
            }
            {showErrorDetail &&
                <Card title="先前上传失败详情：" variant="borderless" style={{ width: "100%", marginBottom: 24 }}>
                    {errorMessageList.map((item) => {
                        return (
                            <ul>{item}</ul>
                        );
                    })}
                </Card>
            }
        </PageContainer>
    );
};

export default App;