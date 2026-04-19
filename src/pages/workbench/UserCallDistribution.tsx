import { Pie } from '@ant-design/charts';
import { Card, Flex, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { getUserCallDistributionVO } from '@/services/ant-design-pro/api';

function UserCallDistribution() {
  const [data, setData] = useState<API.UserCallDistributionVO | null>(null);
  async function fetchData() {
    const res = await getUserCallDistributionVO();
    setData(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const config = {
    forceFit: true,
    title: {
      visible: true,
      text: '用户调用分布',
    },
    description: {
      visible: true,
      text: '用户调用分布',
    },
    radius: 0.8,
    data: data?.callDistribution || [],
    angleField: 'successCount',
    colorField: 'interfacePath',
    label: {
      visible: true,
      type: 'inner',
    },
  };
  return (
    <Card title="用户调用分布">
      <Flex vertical={false} gap={16}>
        <Card style={{ height: 200 }}>
          <Statistic
            title="总调用次数"
            value={data?.totalSuccessCount || 0}
            valueStyle={{ color: '#1677ff' }}
            formatter={(value) => value.toLocaleString()}
          />
        </Card>
        <Card>
          <Pie {...config} />
        </Card>
      </Flex>
    </Card>
  );
}

export default UserCallDistribution;
