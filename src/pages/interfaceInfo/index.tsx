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
import React, { useEffect, useState } from 'react';
import { listInterfaceInfoVOByPage } from '@/services/ant-design-pro/api';

const List: React.FC = () => {
  const [rows, setRows] = useState<API.InterfaceInfo[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState<any>({});
  const [editForm] = Form.useForm();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState<API.InterfaceInfo | null>(null);

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, filters);
  }, [pagination.current, pagination.pageSize, filters]);

  useEffect(() => {
    if (editData && showEditModal) {
      console.log('editData 状态更新为:', editData);
      editForm.setFieldsValue(editData);
    }
  }, [editData, showEditModal]);

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
      title: '创建人',
      dataIndex: 'username',
      key: 'username',
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
          <span onClick={() => {}} style={{ color: 'blue', cursor: 'pointer' }}>
            在线调用
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
    const res = await listInterfaceInfoVOByPage(params);
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
        <span>共 {pagination.total} 个接口</span>
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
    </PageContainer>
  );
};
export default List;
