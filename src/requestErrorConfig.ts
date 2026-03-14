import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';
import { getToken, removeToken } from './utils/token';

// 与后端约定的响应数据格式
interface ResponseStructure {
  code: number;
  data: any;
  message: string;
  description: string;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // // 错误抛出
    // errorThrower: (res) => {
    //   const { code, data, message, description } =
    //     res as unknown as ResponseStructure;
    //   if (code !== 0) {
    //     const error: any = new Error(description);
    //     error.name = 'BizError';
    //     error.info = { code, message, description, data };
    //     throw error; // 抛出自制的错误
    //   }
    // },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;

      // 我们的 errorThrower 抛出的错误。
      if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      const url = config?.url;
      const token = getToken();
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      // 处理 401 未授权
      if (response?.status === 401) {
        removeToken();
        message.error('登录状态失效，请重新登录！');
      }
      const { data } = response as unknown as ResponseStructure;
      if (data?.code !== 0) {
        message.error(data.description);
      }
      return response;
    },
  ],
};
