import {
  ProFormSelect,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';
import type { GetProp, TableProps } from 'antd';
import { Alert, Card, message, Table, Tag } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import dayjs, { type Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { getInterfaceMonitoringInterfaceStat } from '@/services/ant-design-pro/api';
import { useDateRangePicker } from './DateRangePicker';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];

type TablePaginationConfig = Exclude<
  GetProp<TableProps, 'pagination'>,
  boolean
>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const ALLOWED_SORT_FIELDS = {
  total: 'total',
  successRate: 'successRate',
  avgCost: 'avgCost',
};
const SORT_ORDER_ASC = 'ascend';
const SORT_ORDER_DESC = 'descend';

const columns: ColumnsType<API.InterfaceStatVO> = [
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
    title: '总调用次数',
    dataIndex: 'total',
    sorter: true,
    width: '10%',
  },
  {
    title: '成功次数',
    dataIndex: 'success',
    width: '10%',
  },
  {
    title: '失败次数',
    dataIndex: 'fail',
    width: '10%',
  },
  {
    title: '成功率',
    dataIndex: 'successRate',
    sorter: true,
    render: (text: number) => `${text}%`,
    width: '10%',
  },
  {
    title: '平均耗时',
    dataIndex: 'avgCost',
    sorter: true,
    width: '10%',
  },
  {
    title: '最大耗时',
    dataIndex: 'maxCost',
    width: '20%',
  },
];

const InterfaceStat: React.FC = () => {
  const { DateRangePicker, getDateRange } = useDateRangePicker((dates) => {
    setDateRange(dates);
  });
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>(getDateRange());

  const [data, setData] = useState<API.InterfaceStatVO[]>();
  const [loading, setLoading] = useState(false);
  // 最大查询限制
  const MAX_TOTAL = 1000;
  const MAX_PAGE_SIZE = 100;

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '50', '100'],
      showSizeChanger: true,
    },
    sortField: ALLOWED_SORT_FIELDS.total,
    sortOrder: SORT_ORDER_DESC,
  });

  const getRequestBody = (
    tableParams: TableParams,
    dateRange: [Dayjs, Dayjs],
  ) => {
    const requestBody: API.InterfaceStatQueryDTO = {};
    // 限制页码和每页条数
    const pageSize = Math.min(
      tableParams.pagination?.pageSize || 10,
      MAX_PAGE_SIZE,
    );
    const maxPage = Math.ceil(MAX_TOTAL / pageSize);
    const current = Math.min(tableParams.pagination?.current || 1, maxPage);

    requestBody.current = current;
    requestBody.pageSize = pageSize;
    requestBody.sortField = tableParams.sortField as string;
    requestBody.sortOrder = tableParams.sortOrder as string;
    requestBody.startTime = dateRange[0].format('YYYY-MM-DDTHH:mm:ss');
    requestBody.endTime = dateRange[1].format('YYYY-MM-DDTHH:mm:ss');
    requestBody.queryTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
    // ProFormText 返回的是字符串，不是数组
    requestBody.interfacePath = tableParams.filters?.interfacePath as
      | string
      | undefined;
    // 表格列筛选返回的是数组，取第一个元素
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
    console.log('tableParams', tableParams);
    const requestBody = getRequestBody(tableParams, dateRange);
    console.log('InterfaceStat 的 fetchData : 孩子们我被执行了', requestBody);
    setLoading(true);
    const res = await getInterfaceMonitoringInterfaceStat(requestBody);
    if (res.code === 0) {
      const data = res.data || {};
      const records = data.records || [];
      const total =
        data.total || (Array.isArray(data.records) ? data.records.length : 0);
      // 将records中的总调用次数,成功次数,失败次数, 最大耗时由string转换为number
      if (Array.isArray(records)) {
        records.forEach((record: API.InterfaceStatVO) => {
          record.total = Number(record.total);
          record.success = Number(record.success);
          record.fail = Number(record.fail);
          record.successRate = Number(record.successRate);
          record.avgCost = Number(record.avgCost);
          record.maxCost = Number(record.maxCost);
        });
      }
      setData(Array.isArray(records) ? records : []);
      setLoading(false);
      // 将后端返回的 total 设置到 pagination 配置中，最多显示1000条
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: Math.min(total, MAX_TOTAL), // 限制最多显示1000条
        },
      });
    } else {
      setData([]);
      setLoading(false);
      message.error('获取接口监控概览失败');
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
    dateRange[0],
    dateRange[1],
  ]);

  const handleTableChange: TableProps<API.InterfaceStatVO>['onChange'] = (
    pagination,
    filters,
    sorter,
  ) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
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
    <Card title="接口监控统计">
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
          allowClear
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
            { label: 'HEAD', value: 'HEAD' },
            { label: 'OPTIONS', value: 'OPTIONS' },
          ]}
          allowClear
          width="xs"
        />
      </QueryFilter>
      <DateRangePicker />
      <div style={{ margin: '16px 0' }} />
      <Table<API.InterfaceStatVO>
        columns={columns}
        rowKey={(record) => record.interfacePath || ''}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </Card>
  );
};

export default InterfaceStat;
