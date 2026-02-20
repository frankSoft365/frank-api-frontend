import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import {
  ProFormSelect,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';
import {
  Button,
  Form,
  Input,
  Modal,
  message,
  Select,
  Space,
  Table,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import {
  addInterfaceInfo,
  deleteInterfaceInfo,
  getInterfaceInfoById,
  listInterfaceInfoByPage,
  updateInterfaceInfo,
} from '@/services/ant-design-pro/api';

const List: React.FC = () => {
  const [rows, setRows] = useState<API.InterfaceInfo[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState<any>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<API.InterfaceInfo | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, filters);
  }, [pagination.current, pagination.pageSize, filters]);

  const handleEditClick = async (id: string) => {
    setEditingId(id);
    const res = await getInterfaceInfoById({ id });
    if (res && res.data) {
      setEditData(res.data);
      setShowEditModal(true);
    } else {
      message.error('获取接口信息失败!');
    }
  };

  useEffect(() => {
    if (editData && showEditModal) {
      console.log('editData 状态更新为:', editData);
      editForm.setFieldsValue(editData);
    }
  }, [editData, showEditModal]);

  // Edit Modal
  const handleEditOk = async () => {
    try {
      const values = await editForm.validateFields();
      await updateInterfaceInfo({ ...values, id: editingId });
      setShowEditModal(false);
      setEditingId(null);
      setEditData(null);
      editForm.resetFields();
      fetchData(pagination.current, pagination.pageSize, filters);
      message.success('更新成功');
    } catch (e) {
      message.error('更新失败');
    }
  };

  const handleEditCancel = () => {
    setShowEditModal(false);
    setEditingId(null);
    setEditData(null);
    editForm.resetFields();
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteOk = async () => {
    if (deletingId != null) {
      await deleteInterfaceInfo({ id: deletingId });
      setShowDeleteModal(false);
      setDeletingId(null);
      fetchData(pagination.current, pagination.pageSize, filters);
      message.success('删除成功');
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeletingId(null);
  };

  const columns = [
    {
      title: '接口名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '请求路径',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '接口描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      key: 'requestHeader',
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      key: 'responseHeader',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (_text: any, _record: any, index: number) =>
        dayjs(_record.updateTime).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '创建人',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '接口状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: any) => {
        if (text === 1) {
          return (
            <span style={{ color: 'green', fontWeight: 500 }}>已开启</span>
          );
        } else if (text === 0) {
          return <span style={{ color: 'red', fontWeight: 500 }}>已关闭</span>;
        } else {
          return <span>-</span>;
        }
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_text: any, record: any, index: number) => (
        <Space size="middle">
          <span
            onClick={() => handleEditClick(record.id)}
            style={{ color: 'blue', cursor: 'pointer' }}
          >
            修改
          </span>
          <span
            onClick={() => handleDeleteClick(record.id)}
            style={{ color: 'red', cursor: 'pointer' }}
          >
            删除
          </span>
        </Space>
      ),
    },
  ];

  const fetchData = async (
    current: number,
    pageSize: number,
    filterValues: any,
  ) => {
    const params = {
      current,
      pageSize,
      ...filterValues,
    };
    const res = await listInterfaceInfoByPage(params);
    setRows(res.data.records || []);
    setPagination((prev) => ({ ...prev, total: res.data.total || 0 }));
  };

  const handleQuery = async (values: any) => {
    setFilters(values);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };
  const handleReset = async () => {
    setFilters({});
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleTableChange = (paginationObj: any) => {
    setPagination({
      ...pagination,
      current: paginationObj.current,
      pageSize: paginationObj.pageSize,
    });
  };

  return (
    <PageContainer>
      {/* 条件查询的条件筛选面板 */}
      <QueryFilter onFinish={handleQuery} onReset={handleReset}>
        <ProFormText
          name="name"
          label="接口名称"
          placeholder="请输入接口名称"
        />
        <ProFormText name="url" label="请求路径" placeholder="请输入请求路径" />
        <ProFormText
          name="description"
          label="接口描述"
          placeholder="请输入接口描述"
        />
        <ProFormSelect
          name="status"
          label="接口状态"
          placeholder="请选择接口状态"
          options={[
            { label: '开启', value: 1 },
            { label: '关闭', value: 0 },
          ]}
          allowClear
        />
        <ProFormSelect
          name="method"
          label="请求方式"
          placeholder="请选择请求方式"
          options={[
            { label: 'GET', value: 'GET' },
            { label: 'POST', value: 'POST' },
            { label: 'PUT', value: 'PUT' },
            { label: 'DELETE', value: 'DELETE' },
            { label: 'PATCH', value: 'PATCH' },
            { label: 'HEAD', value: 'HEAD' },
            { label: 'OPTIONS', value: 'OPTIONS' },
          ]}
          allowClear
        />
      </QueryFilter>
      <div
        style={{
          marginBottom: 16,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span>共 {pagination.total} 条数据</span>
        <Button type="primary" onClick={() => setShowAddModal(true)}>
          新增接口
        </Button>
      </div>
      <Table
        dataSource={rows}
        columns={columns}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />
      {/* Edit Modal */}
      <Modal
        title="编辑接口"
        open={showEditModal}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      >
        <Form form={editForm} layout="vertical" name="editInterfaceForm">
          <Form.Item
            name="name"
            label="接口名称"
            rules={[{ required: true, message: '请输入接口名称' }]}
          >
            <Input placeholder="请输入接口名称" />
          </Form.Item>
          <Form.Item
            name="url"
            label="请求路径"
            rules={[{ required: true, message: '请输入请求路径' }]}
          >
            <Input placeholder="请输入请求路径" />
          </Form.Item>
          <Form.Item name="requestHeader" label="请求头">
            <Input placeholder="请输入请求头 (可选)" />
          </Form.Item>
          <Form.Item name="responseHeader" label="响应头">
            <Input placeholder="请输入响应头 (可选)" />
          </Form.Item>
          <Form.Item name="description" label="接口描述">
            <Input.TextArea placeholder="请输入接口描述 (可选)" />
          </Form.Item>
          <Form.Item
            name="method"
            label="请求方式"
            rules={[{ required: true, message: '请选择请求方式' }]}
          >
            <Select
              options={[
                { label: 'GET', value: 'GET' },
                { label: 'POST', value: 'POST' },
                { label: 'PUT', value: 'PUT' },
                { label: 'DELETE', value: 'DELETE' },
                { label: 'PATCH', value: 'PATCH' },
                { label: 'HEAD', value: 'HEAD' },
                { label: 'OPTIONS', value: 'OPTIONS' },
              ]}
              placeholder="请选择请求方式"
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="接口状态"
            rules={[{ required: true, message: '请选择接口状态' }]}
          >
            <Select
              options={[
                { label: '关闭', value: 0 },
                { label: '打开', value: 1 },
              ]}
              placeholder="请选择接口状态"
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* Delete Modal */}
      <Modal
        title="确认删除"
        open={showDeleteModal}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        okText="确定"
        cancelText="取消"
      >
        <p>确定要删除该接口吗？</p>
      </Modal>
      <Modal
        title="新增接口"
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        onOk={() => addForm.submit()}
      >
        <Form
          form={addForm}
          layout="vertical"
          name="addInterfaceForm"
          initialValues={{ method: 'GET' }}
          onFinish={async (values) => {
            const res = await addInterfaceInfo(values);
            setShowAddModal(false);
            addForm.resetFields();
            fetchData(pagination.current, pagination.pageSize, filters);
            if (res.data > 0) {
              message.success('新增接口！');
            }
          }}
        >
          <Form.Item
            name="name"
            label="接口名称"
            rules={[{ required: true, message: '请输入接口名称' }]}
          >
            <Input placeholder="请输入接口名称" />
          </Form.Item>
          <Form.Item
            name="url"
            label="请求路径"
            rules={[{ required: true, message: '请输入请求路径' }]}
          >
            <Input placeholder="请输入请求路径" />
          </Form.Item>
          <Form.Item name="requestHeader" label="请求头">
            <Input placeholder="请输入请求头 (可选)" />
          </Form.Item>
          <Form.Item name="responseHeader" label="响应头">
            <Input placeholder="请输入响应头 (可选)" />
          </Form.Item>
          <Form.Item name="description" label="接口描述">
            <Input.TextArea placeholder="请输入接口描述 (可选)" />
          </Form.Item>
          <Form.Item
            name="method"
            label="请求方式"
            rules={[{ required: true, message: '请选择请求方式' }]}
          >
            <Select
              options={[
                { label: 'GET', value: 'GET' },
                { label: 'POST', value: 'POST' },
                { label: 'PUT', value: 'PUT' },
                { label: 'DELETE', value: 'DELETE' },
                { label: 'PATCH', value: 'PATCH' },
                { label: 'HEAD', value: 'HEAD' },
                { label: 'OPTIONS', value: 'OPTIONS' },
              ]}
              placeholder="请选择请求方式"
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
export default List;
