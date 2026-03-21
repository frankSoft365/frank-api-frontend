import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import {
  ProFormSelect,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { Button, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { listInterfaceInfoVOByPage } from '@/services/ant-design-pro/api';

const InterfaceInfo: React.FC = () => {
  const [rows, setRows] = useState<API.InterfaceInfo[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, filters);
  }, [pagination.current, pagination.pageSize, filters]);

  // 用于确认查询回显信息
  // useEffect(() => {
  //   if (interfaceInfo && showOnlineCallModal) {
  //     console.log('interfaceinfo 状态更新为:', interfaceInfo);
  //   }
  // }, [interfaceInfo, showOnlineCallModal]);

  const columns = [
    {
      title: '接口名称',
      dataIndex: 'name',
      key: 'name',
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
      render: (text: any) => {
        const method = String(text ?? '-').toUpperCase();
        const colorMap: Record<string, string> = {
          GET: 'green',
          POST: 'blue',
          PUT: 'orange',
          DELETE: 'red',
          PATCH: 'purple',
        };
        return <Tag color={colorMap[method]}>{method}</Tag>;
      },
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
          return <Tag color="green">已开启</Tag>;
        } else if (text === 0) {
          return <Tag color="red">已关闭</Tag>;
        } else {
          return <Tag>未知</Tag>;
        }
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_text: any, record: any, _index: number) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              handleClickOnlineCall(record.id);
            }}
            style={{ padding: 0 }}
          >
            查看 & 在线调用
          </Button>
        </Space>
      ),
    },
  ];

  // 在线调用面板 ------start------
  const handleClickOnlineCall = async (id: string) => {
    navigate(`/interfaceInfo/${id}`);
  };
  // 在线调用面板 ------end------

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
          pageSizeOptions: [10, 20],
        }}
        onChange={handleTableChange}
      />
    </PageContainer>
  );
};
export default InterfaceInfo;
