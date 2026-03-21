import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { useNavigate, useParams } from '@umijs/max';
import { Button, Card, Form, message, Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  getInterfaceInfoById,
  onlineCallInterface,
} from '@/services/ant-design-pro/api';
import DynamicFormByInterfaceInfo from './DynamicFormByInterfaceInfo';

const InterfaceInfo: React.FC = () => {
  const [onlineCallForm] = Form.useForm();
  const [interfaceInfo, setInterfaceInfo] = useState<API.InterfaceInfo | null>(
    null,
  );
  const [response, setResponse] = useState<any>(null);
  const param = useParams();
  const navigate = useNavigate();

  const fetchInterfaceInfo = async () => {
    if (param?.id) {
      const res = await getInterfaceInfoById({ id: param.id });
      if (res?.data) {
        setInterfaceInfo(res.data);
      } else {
        message.error('获取接口信息失败!');
      }
    } else {
      message.error('获取接口信息失败!');
    }
  };

  useEffect(() => {
    fetchInterfaceInfo();
  }, []);

  const handleOnlineCallOk = async () => {
    if (interfaceInfo?.status === 0) {
      message.error('接口已关闭！');
      return;
    }
    try {
      const values = await onlineCallForm.validateFields();
      const onlineCallRequest = {
        id: param.id,
        param: values,
      } as API.OnlineCallRequest;
      const res = await onlineCallInterface(onlineCallRequest);
      if (res.code === 0) {
        message.success('请求成功');
        setResponse(res.data);
      }
    } catch (_e) {
      message.error('请求失败！');
    }
  };

  const buttonText =
    interfaceInfo?.status === 0 ? '接口关闭无法调用' : '发送请求';
  const disabledReason = !interfaceInfo
    ? '无法获取接口信息'
    : interfaceInfo.status === 0
      ? '接口已关闭，无法发送请求'
      : undefined;

  return (
    <PageContainer
      onBack={() => navigate('/interfaceInfoCenter')}
      title={
        <Space size={8}>
          <span>接口信息</span>
          <Button type="link" onClick={() => navigate('/interfaceInfoCenter')}>
            返回接口中心
          </Button>
        </Space>
      }
    >
      <Card title="在线调用">
        {interfaceInfo ? (
          <>
            <DynamicFormByInterfaceInfo
              form={onlineCallForm}
              interfaceInfo={interfaceInfo}
              response={response}
            />
            <div style={{ display: 'flex', justifyContent: 'left' }}>
              {disabledReason ? (
                <Tooltip title={disabledReason}>
                  <span>
                    <Button type="primary" disabled>
                      {buttonText}
                    </Button>
                  </span>
                </Tooltip>
              ) : (
                <Button type="primary" onClick={handleOnlineCallOk}>
                  {buttonText}
                </Button>
              )}
            </div>
          </>
        ) : (
          '无法获取接口信息'
        )}
      </Card>
    </PageContainer>
  );
};

export default InterfaceInfo;
