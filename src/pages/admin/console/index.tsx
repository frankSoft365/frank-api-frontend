import { PageContainer } from '@ant-design/pro-components';
import { Alert } from 'antd';
import React from 'react';
import InterfaceStat from './InterfaceStat';
import Overview from './Overview';
import UserCallRank from './UserCallRank';

const Console: React.FC = () => {
  return (
    <PageContainer>
      <Alert
        message="日志记录仅作参考，保留30天"
        type="warning"
        showIcon
        closable
      />
      <Overview />
      <InterfaceStat />
      <UserCallRank />
    </PageContainer>
  );
};

export default Console;
