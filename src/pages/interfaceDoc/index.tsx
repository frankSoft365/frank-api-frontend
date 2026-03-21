import { PageContainer } from '@ant-design/pro-components';
import { Anchor, Col, Row } from 'antd';
import React from 'react';
import MarkdownViewer from './MarkdownViewer';

const InterfaceDoc: React.FC = () => {
  const paths = [
    '/docs/quick-start.md',
    '/docs/api-info.md',
    '/docs/api-sdk.md',
    '/docs/success-response.md',
    '/docs/error-response.md',
    '/docs/error-code.md',
  ];

  return (
    <PageContainer>
      <Row gutter={24}>
        <Col span={20}>
          {paths.map((path) => {
            return <MarkdownViewer key={path} path={path} />;
          })}
        </Col>

        <Col span={4}>
          <Anchor
            affix={true}
            offsetTop={100}
            items={[
              {
                key: '快速开始',
                href: '#快速开始',
                title: '快速开始',
              },
              {
                key: '接口信息',
                href: '#接口信息',
                title: '接口信息',
              },
              {
                key: '接口SDK',
                href: '#SDK',
                title: 'SDK',
              },
              {
                key: '返回结果',
                href: '#正确返回结果',
                title: '返回结果',
                children: [
                  {
                    key: '正确返回结果',
                    href: '#正确返回结果',
                    title: '正确返回结果',
                  },
                  {
                    key: '错误返回结果',
                    href: '#错误返回结果',
                    title: '错误返回结果',
                  },
                  {
                    key: '错误码',
                    href: '#错误码',
                    title: '错误码',
                  },
                ],
              },
            ]}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default InterfaceDoc;
