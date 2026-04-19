import { PageContainer } from '@ant-design/pro-components';
import { Alert } from 'antd';
import React from 'react';
import Overview from './Overview';
import UserCallDistribution from './UserCallDistribution';
import UserInterfaceLog from './UserInterfaceLog';

const Workbench: React.FC = () => {
  return (
    <PageContainer title="工作台">
      <Alert
        message="日志记录仅作参考，保留30天"
        type="warning"
        showIcon
        closable
      />
      <Overview />
      <UserInterfaceLog />
      <UserCallDistribution />
    </PageContainer>
  );
};

export default Workbench;
