import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import {
  Alert,
  Button,
  Card,
  Flex,
  Input,
  Modal,
  message,
  Space,
  Tag,
  Typography,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { checkViewChance, viewAkSk } from '@/services/ant-design-pro/api';

export default function Console() {
  const [warningOpen, setWarningOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [ak, setAk] = useState<string | null>(null);
  const [sk, setSk] = useState<string | null>(null);
  const [viewed, setViewed] = useState(false);

  const maskedValue = useMemo(() => '****************', []);

  const fetchChance = async () => {
    setChecking(true);
    try {
      const res = await checkViewChance();
      if (res.code === 0) {
        setViewed(!res.data?.hasChance);
        return;
      }
      message.error(res.message || '获取查看状态失败');
    } catch (_e) {
      message.error('获取查看状态失败');
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    fetchChance();
  }, []);

  const handleStartView = () => {
    if (viewed) {
      message.warning('AK/SK 已查看过，无法再次获取');
      return;
    }
    setWarningOpen(true);
  };

  const handleConfirmWarning = async () => {
    setLoading(true);
    try {
      const res = await viewAkSk();
      if (res.code === 0 && res.data?.accessKey && res.data?.secretKey) {
        setAk(res.data.accessKey);
        setSk(res.data.secretKey);
        setWarningOpen(false);
        setViewOpen(true);
        return;
      }
      setWarningOpen(false);
      message.error(res.message || '获取 AK/SK 失败或已无查看次数');
      fetchChance();
    } catch (_e) {
      setWarningOpen(false);
      message.error('获取 AK/SK 失败');
    } finally {
      setLoading(false);
    }
  };

  const closeAfterSaved = () => {
    setViewOpen(false);
    setViewed(true);
    setAk(null);
    setSk(null);
    message.success('已关闭，请妥善保存 AK/SK');
  };

  const handleAttemptCloseViewModal = () => {
    Modal.confirm({
      title: '确认关闭？',
      content: 'AK/SK 仅有一次查看机会，关闭前请确认你已保存。',
      okText: '已保存，关闭',
      cancelText: '未保存',
      okButtonProps: { danger: false },
      onOk: closeAfterSaved,
    });
  };

  return (
    <PageContainer title="控制台">
      <Flex vertical gap={16}>
        <Card
          title={
            <Space size={8}>
              <span>AK/SK 管理</span>
              {checking ? (
                <Tag>加载中</Tag>
              ) : viewed ? (
                <Tag color="default">已查看</Tag>
              ) : (
                <Tag color="blue">未查看</Tag>
              )}
            </Space>
          }
          extra={
            <Button
              type="primary"
              onClick={handleStartView}
              disabled={viewed || checking}
              loading={checking}
            >
              查看
            </Button>
          }
        >
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            <Alert
              type="warning"
              showIcon
              message="AccessKey/SecretKey 仅能查看一次，请在安全的环境中保存。"
            />
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <div>
                <Typography.Text type="secondary">AccessKey</Typography.Text>
                <Input.Password
                  value={maskedValue}
                  readOnly
                  disabled
                  visibilityToggle={false}
                  style={{ marginTop: 6 }}
                />
              </div>
              <div>
                <Typography.Text type="secondary">SecretKey</Typography.Text>
                <Input.Password
                  value={maskedValue}
                  readOnly
                  disabled
                  visibilityToggle={false}
                  style={{ marginTop: 6 }}
                />
              </div>
            </Space>
          </Space>
        </Card>
      </Flex>

      <Modal
        title="仅一次查看机会"
        open={warningOpen}
        okText="确认查看"
        cancelText="取消"
        confirmLoading={loading}
        onOk={handleConfirmWarning}
        onCancel={() => setWarningOpen(false)}
      >
        <Alert
          type="warning"
          showIcon
          message="AK/SK 仅有一次查看机会"
          description="继续操作将向后端申请展示 AK/SK，请确保当前环境安全，并准备好立即保存。"
        />
      </Modal>

      <Modal
        title="你的 AK/SK（请立即保存）"
        open={viewOpen}
        onCancel={handleAttemptCloseViewModal}
        maskClosable={false}
        footer={[
          <Button key="saved" type="primary" onClick={closeAfterSaved}>
            我已保存，关闭
          </Button>,
        ]}
      >
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <Alert
            type="error"
            showIcon
            message="关闭后无法再次查看"
            description="请复制并妥善保存 AccessKey 与 SecretKey。"
          />
          <div>
            <Typography.Text type="secondary">AccessKey</Typography.Text>
            <Typography.Paragraph
              copyable={{ text: ak ?? '' }}
              style={{ marginBottom: 0 }}
            >
              {ak}
            </Typography.Paragraph>
          </div>
          <div>
            <Typography.Text type="secondary">SecretKey</Typography.Text>
            <Typography.Paragraph
              copyable={{ text: sk ?? '' }}
              style={{ marginBottom: 0 }}
            >
              {sk}
            </Typography.Paragraph>
          </div>
        </Space>
      </Modal>
    </PageContainer>
  );
}
