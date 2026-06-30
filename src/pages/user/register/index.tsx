import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormText,
} from '@ant-design/pro-components';
import { Helmet, history } from '@umijs/max';
import { App, Form, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { Footer } from '@/components';
import {
  register,
  sendEmailVerificationCode,
} from '@/services/ant-design-pro/api';
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
  const [form] = Form.useForm();
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
        setTimeout(() => (window.location.href = '/user/login'), 500);
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
          form={form}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/frank.jpg" />}
          title="Frank API"
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
              <ProFormText
                name="email"
                placeholder="请输入邮箱"
                rules={[
                  {
                    required: true,
                    message: '邮箱是必填项！',
                  },
                  {
                    type: 'email',
                    message: '邮箱格式错误！',
                  },
                ]}
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined />,
                }}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码！'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'秒后重新获取'}`;
                  }
                  return '获取验证码';
                }}
                phoneName="email"
                name="verifyCode"
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项！',
                  },
                ]}
                onGetCaptcha={async () => {
                  const formValues = form.getFieldsValue();
                  const emailValue = formValues.email as string;

                  if (!emailValue) {
                    message.error('请先输入邮箱！');
                    throw new Error('请先输入邮箱！');
                  }

                  const emailRegex =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                  if (!emailRegex.test(emailValue)) {
                    message.error('请输入正确的邮箱格式！');
                    throw new Error('邮箱格式错误！');
                  }

                  try {
                    const result = await sendEmailVerificationCode({
                      email: emailValue,
                    });
                    if (result.code === 0) {
                      message.success(
                        `获取验证码成功！验证码为：${result.data.verifyCode}`,
                      );
                    } else {
                      message.error(
                        result.description ||
                          result.message ||
                          '发送验证码失败',
                      );
                      throw new Error(result.description || result.message);
                    }
                  } catch (error: any) {
                    if (
                      !error.message ||
                      (!error.message.includes('请先输入') &&
                        !error.message.includes('邮箱格式'))
                    ) {
                      message.error('发送验证码失败，请稍后重试');
                    }
                    throw error;
                  }
                }}
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
