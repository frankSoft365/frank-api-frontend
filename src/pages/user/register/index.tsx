import { Footer } from '@/components';
import { register } from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import { Helmet, history } from '@umijs/max';
import { App, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});
const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { styles } = useStyles();
  const { message } = App.useApp();
  const handleSubmit = async (values: API.RegisterParams) => {
    // 两次输入的密码相同
    const { password, checkPassword } = values;
    if (password !== checkPassword) {
      message.error('两次输入密码不一致！');
      return;
    }
    try {
      // 注册
      const res = await register({
        ...values,
      });
      if (res.code === 0 && res.data > 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        setInterval(() => window.location.href = '/user/login', 500);
        return;
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'注册'}
          {Settings.title && ` - ${Settings.title}`}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/furoro.webp" />}
          title="User Center"
          initialValues={{
            autoLogin: true,
          }}
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码注册',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入账户名'}
                rules={[
                  {
                    required: true,
                    message: '账户名是必填项！',
                  },
                  {
                    type: 'string',
                    min: 6,
                    max: 20,
                  },
                  {
                    pattern: /^[a-zA-Z0-9_-]+$/,
                    message: '账户名只能包含字母、数字、下划线或短横线',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    type: 'string',
                    min: 6,
                    max: 20,
                  },
                  {
                    pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=]+$/,
                    message: '密码只能包含字母、数字或常见特殊字符！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请确认密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    type: 'string',
                    min: 6,
                    max: 20,
                  },
                  {
                    pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=]+$/,
                    message: '密码只能包含字母、数字或常见特殊字符！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
              float: 'right',
            }}
          >
            <span>已有账号？</span>
            <a
              style={{ marginLeft: 8 }}
              onClick={() => history.push('/user/login')}
            >
              去登录
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
