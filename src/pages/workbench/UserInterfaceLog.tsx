import {
  ProFormSelect,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';
import type { GetProp, TableProps } from 'antd';
import { Alert, Card, message, Popconfirm, Table, Tag } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDateRangePicker } from '@/pages/admin/console/DateRangePicker';
import { getUserInterfaceLogVO } from '@/services/ant-design-pro/api';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, 'pagination'>,
  boolean
>;

interface TableParams {
  pagination?: TablePaginationConfig;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const columns: ColumnsType<API.UserInterfaceLogVO> = [
  {
    title: '请求ID',
    dataIndex: 'requestId',
    width: '20%',
  },
  {
    title: '接口地址',
    dataIndex: 'interfacePath',
    width: '20%',
  },
  {
    title: '请求方法',
    dataIndex: 'requestMethod',
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
    width: '10%',
  },
  {
    title: '请求结果(点击查看详情)',
    dataIndex: 'success',
    render: (text: number, record: API.UserInterfaceLogVO) => {
      const colorMap: Record<number, string> = {
        1: 'green',
        0: 'red',
      };
      return (
        <Popconfirm
          title="错误信息"
          description={record.errorMessage ?? '无错误信息'}
          okText="确认"
          cancelText="关闭"
        >
          <Tag color={colorMap[text]} style={{ cursor: 'pointer' }}>
            {text === 1 ? '成功' : '失败'}
          </Tag>
        </Popconfirm>
      );
    },
    width: '20%',
  },
  {
    title: '耗时',
    dataIndex: 'costTime',
    width: '10%',
    render: (text: number) => `${text}ms`,
  },
  {
    title: '请求时间',
    dataIndex: 'requestTime',
    key: 'requestTime',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    width: '20%',
  },
];

const UserInterfaceLog: React.FC = () => {
  const { DateRangePicker, getDateRange } = useDateRangePicker((dates) => {
    setDateRange(dates);
  });
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>(getDateRange());
  const [data, setData] = useState<API.UserInterfaceLogVO[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: ['10', '20'],
    },
  });

  const getRequestBody = (
    tableParams: TableParams,
    dateRange: [Dayjs, Dayjs],
  ) => {
    const requestBody: API.UserInterfaceLogQueryDTO = {};
    requestBody.current = tableParams.pagination?.current || 1;
    requestBody.pageSize = tableParams.pagination?.pageSize || 10;
    requestBody.startTime = dateRange[0].format('YYYY-MM-DDTHH:mm:ss');
    requestBody.endTime = dateRange[1].format('YYYY-MM-DDTHH:mm:ss');
    requestBody.queryTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
    // ProFormText 返回的是字符串，不是数组
    requestBody.interfacePath = tableParams.filters?.interfacePath as
      | string
      | undefined;
    requestBody.requestMethod = tableParams.filters?.requestMethod as
      | string
      | undefined;
    // ProFormSelect 返回的是单个值，不是数组
    const resultValue = tableParams.filters?.requestResult as
      | number
      | undefined;
    requestBody.requestResult =
      resultValue === 2 ? undefined : (resultValue as number | undefined);
    return requestBody;
  };

  const fetchData = async () => {
    const requestBody = getRequestBody(tableParams, dateRange);
    setLoading(true);
    const res = await getUserInterfaceLogVO(requestBody);
    if (res.code === 0) {
      const data = res.data || {};
      const records = data.records || [];
      const total =
        data.total || (Array.isArray(data.records) ? data.records.length : 0);
      // 将costTime由string转换为number
      if (Array.isArray(records)) {
        records.forEach((record: API.UserInterfaceLogVO) => {
          record.costTime = Number(record.costTime);
        });
      }
      setData(Array.isArray(records) ? records : []);
      setLoading(false);
      // 将后端返回的 total 设置到 pagination 配置中
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: total, // 使用后端返回的真实数据总量
        },
      });
    } else {
      setData([]);
      setLoading(false);
      message.error('获取接口调用日志失败');
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    JSON.stringify(tableParams.filters),
    dateRange[0],
    dateRange[1],
  ]);

  const handleTableChange: TableProps<API.UserInterfaceLogVO>['onChange'] = (
    pagination,
    filters,
  ) => {
    setTableParams({
      pagination,
      filters,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const handleQuery = async (values: any) => {
    setTableParams({
      ...tableParams,
      filters: {
        ...tableParams.filters,
        ...values,
      },
    });
  };
  const handleReset = async () => {
    // 去除interfacePath和requestResult中的undefined值
    setTableParams({
      ...tableParams,
      filters: {
        ...tableParams.filters,
        requestMethod: null,
        interfacePath: null,
        requestResult: null,
      },
    });
  };

  return (
    <Card title="接口调用日志">
      <Alert
        message="日志记录仅作参考，保留30天"
        type="warning"
        showIcon
        closable
      />
      <QueryFilter onFinish={handleQuery} onReset={handleReset} span={6}>
        <ProFormText
          name="interfacePath"
          label="接口地址"
          placeholder="请输入接口地址"
          width="xs"
        />
        <ProFormSelect
          name="requestResult"
          label="请求状态"
          placeholder="请选择请求状态"
          options={[
            { label: '全部', value: 2 },
            { label: '成功', value: 1 },
            { label: '失败', value: 0 },
          ]}
          width="xs"
        />
        <ProFormSelect
          name="requestMethod"
          label="请求方式"
          placeholder="请选择请求方式"
          options={[
            { label: 'GET', value: 'GET' },
            { label: 'POST', value: 'POST' },
            { label: 'PUT', value: 'PUT' },
            { label: 'DELETE', value: 'DELETE' },
            { label: 'PATCH', value: 'PATCH' },
          ]}
          width="xs"
        />
      </QueryFilter>
      <DateRangePicker />
      <div style={{ margin: '16px 0' }} />
      <Table<API.UserInterfaceLogVO>
        columns={columns}
        rowKey={(record) => record.requestId || ''}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </Card>
  );
};

export default UserInterfaceLog;
