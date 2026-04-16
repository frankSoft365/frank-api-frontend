import { Line } from '@ant-design/charts';
import { ReloadOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Col, message, Row, Spin, Statistic } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { getInterfaceMonitoringOverview } from '@/services/ant-design-pro/api';
import { useDateRangePicker } from './DateRangePicker';

export default function Overview() {
  const { DateRangePicker, getDateRange } = useDateRangePicker((dates) => {
    setDateRange(dates);
  });
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>(getDateRange());

  // 接口监控概览数据
  const [data, setData] = useState<API.InterfaceMonitoringOverviewData | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const startTime = dateRange[0].format('YYYY-MM-DDTHH:mm:ss');
      const endTime = dateRange[1].format('YYYY-MM-DDTHH:mm:ss');
      const queryTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
      const response = await getInterfaceMonitoringOverview({
        startTime,
        endTime,
        queryTime,
      });
      console.log(
        'Overview 的 fetchData :',
        'startTime',
        startTime,
        'endTime',
        endTime,
        'queryTime',
        queryTime,
      );
      if (response.code !== 0) {
        message.error(response.message);
        return;
      }
      setData(response.data);
    } catch (err) {
      message.error('数据加载失败，请重试');
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    fetchData();
  };

  // 调用趋势图
  function formatCallTrend(data: API.InterfaceMonitoringOverviewData) {
    return data.callTrend.map((item) => ({
      ...item,
      value: Number(item.value),
    }));
  }
  const config = {
    title: {
      visible: true,
      text: '调用次数趋势',
    },
    padding: 'auto',
    forceFit: true,
    data: data ? formatCallTrend(data) : [],
    xField: 'time',
    yField: 'value',
    label: {
      visible: true,
      type: 'point',
    },
    point: {
      visible: true,
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#2593fc',
        lineWidth: 2,
      },
    },
  };
  return (
    <div>
      <div
        style={{
          margin: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <DateRangePicker />
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
            刷新
          </Button>
        </div>
      </div>

      <Spin spinning={loading} tip="加载中...">
        {data ? (
          <>
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="总调用次数"
                    value={data.totalCall}
                    valueStyle={{ color: '#1677ff' }}
                    formatter={(value) => value.toLocaleString()}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="成功率"
                    value={data.successRate}
                    suffix="%"
                    valueStyle={{
                      color:
                        data.successRate >= 90
                          ? '#00b42a'
                          : data.successRate >= 70
                            ? '#ff7d00'
                            : '#f53f3f',
                    }}
                    formatter={(value) =>
                      typeof value === 'number' ? value.toFixed(1) : value
                    }
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="平均耗时"
                    value={data.avgCost}
                    suffix="ms"
                    valueStyle={{ color: '#1677ff' }}
                    formatter={(value) =>
                      typeof value === 'number' ? value.toFixed(1) : value
                    }
                  />
                </Card>
              </Col>
            </Row>

            <Card title="调用次数趋势图" style={{ minHeight: 400 }}>
              {data.callTrend && data.callTrend.length > 0 ? (
                <Line {...config} />
              ) : (
                '暂无数据'
              )}
            </Card>
          </>
        ) : !loading ? (
          <Alert
            message="暂无数据"
            description="请选择时间范围查看数据"
            type="info"
            showIcon
          />
        ) : null}
      </Spin>
    </div>
  );
}
