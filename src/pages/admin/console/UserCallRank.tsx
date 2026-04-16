import { ProFormText, QueryFilter } from '@ant-design/pro-components';
import type { GetProp, TableProps } from 'antd';
import { Alert, Card, message, Table } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import React, { type Key, useEffect, useState } from 'react';
import { getInterfaceMonitoringUserCallRank } from '@/services/ant-design-pro/api';
import { useDateRangePicker } from './DateRangePicker';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];

type TablePaginationConfig = Exclude<
  GetProp<TableProps, 'pagination'>,
  boolean
>;

interface TableParams {
  pagination?: TablePaginationConfig;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const columns: ColumnsType<API.UserCallRankVO> = [
  {
    title: '用户ID',
    dataIndex: 'userId',
    key: 'userId',
    width: '20%',
  },
  {
    title: '调用接口数',
    dataIndex: 'interfaceCount',
    key: 'interfaceCount',
    width: '10%',
  },
  {
    title: '总调用次数',
    dataIndex: 'totalCall',
    sorter: true,
    width: '20%',
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
    width: '20%',
  },
  {
    title: '最后调用时间',
    dataIndex: 'lastCallTime',
    key: 'lastCallTime',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    width: '40%',
  },
];

const UserCallRank: React.FC = () => {
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
  });

  const getRequestBody = (
    tableParams: TableParams,
    dateRange: [Dayjs, Dayjs],
  ) => {
    const requestBody: API.UserCallRankQueryDTO = {};
    // 限制页码和每页条数
    const pageSize = Math.min(
      tableParams.pagination?.pageSize || 10,
      MAX_PAGE_SIZE,
    );
    const maxPage = Math.ceil(MAX_TOTAL / pageSize);
    const current = Math.min(tableParams.pagination?.current || 1, maxPage);

    requestBody.current = current;
    requestBody.pageSize = pageSize;
    requestBody.startTime = dateRange[0].format('YYYY-MM-DDTHH:mm:ss');
    requestBody.endTime = dateRange[1].format('YYYY-MM-DDTHH:mm:ss');
    requestBody.queryTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
    requestBody.userId = tableParams.filters?.userId as string | undefined;
    return requestBody;
  };

  const fetchData = async () => {
    console.log('tableParams', tableParams);
    const requestBody = getRequestBody(tableParams, dateRange);
    console.log('UserCallRank 的 fetchData : 孩子们我被执行了', requestBody);
    setLoading(true);
    const res = await getInterfaceMonitoringUserCallRank(requestBody);
    if (res.code === 0) {
      const data = res.data || {};
      const records = data.records || [];
      const total =
        data.total || (Array.isArray(data.records) ? data.records.length : 0);
      // 将records中的总调用次数,成功次数,失败次数, 最大耗时由string转换为number
      if (Array.isArray(records)) {
        records.forEach((record: API.UserCallRankVO) => {
          record.totalCall = Number(record.totalCall);
          record.interfaceCount = Number(record.interfaceCount);
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
      message.error('获取用户调用次数排名失败');
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

  const handleTableChange: TableProps<API.InterfaceStatVO>['onChange'] = (
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
    setTableParams({
      ...tableParams,
      filters: {},
    });
  };

  return (
    <Card title="用户调用次数排名">
      <Alert
        message="日志记录仅作参考，保留30天"
        type="warning"
        showIcon
        closable
      />
      <QueryFilter onFinish={handleQuery} onReset={handleReset} span={6}>
        <ProFormText
          name="userId"
          label="用户ID"
          placeholder="请输入用户ID"
          fieldProps={{
            type: 'text',
            maxLength: 19,
            onInput: (e: React.FormEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/[^0-9]/g, '');
              if (target.value.length > 19) {
                target.value = target.value.slice(0, 19);
              }
            },
          }}
        />
      </QueryFilter>
      <DateRangePicker />
      <div style={{ margin: '16px 0' }} />
      <Table<API.UserCallRankVO>
        columns={columns}
        rowKey={(record) => record.userId as Key}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </Card>
  );
};

export default UserCallRank;
