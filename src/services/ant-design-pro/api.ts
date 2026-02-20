// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.Result<API.CurrentUser>>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.Result<API.LoginResult>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.Result<API.RegisterResult>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户列表 GET /api/user/search?username=example */
export async function getUserList(params?: { username?: string }, options?: { [key: string]: any }) {
  return request<API.Result<API.CurrentUser[]>>('/api/user/search', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 批量导入用户信息 POST /api/user/batchImportUser */
export async function batchImportUser(body: FormData, options?: { [key: string]: any }) {
  return request<API.Result<API.UserImportResponse>>('/api/user/batchImportUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户信息 PUT /api/user/update */
export async function updateUserInfo(body: API.CurrentUser, options?: { [key: string]: any }) {
  return request<API.Result<void>>('/api/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 上传用户头像 POST /api/upload */
export async function uploadAvatar(body: FormData, options?: { [key: string]: any }) {
  return request<API.Result<string>>('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取分页接口信息 POST /api/interfaceInfo/list/page */
export async function listInterfaceInfoByPage(body: API.InterfaceInfoPageParams, options?: { [key: string]: any }) {
  return request<API.Result<API.InterfaceInfoPageResult>>('/api/interfaceInfo/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加一个接口 POST /api/interfaceInfo/add */
export async function addInterfaceInfo(body: API.InterfaceInfoAddParams, options?: { [key: string]: any }) {
  return request<API.Result<number>>('/api/interfaceInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id查询接口信息 GET /api/interfaceInfo/get/vo?id=248389289820203 */
export async function getInterfaceInfoById(params?: { id: string }, options?: { [key: string]: any }) {
  return request<API.Result<API.InterfaceInfo>>('/api/interfaceInfo/get/vo', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 修改接口 POST /api/interfaceInfo/update */
export async function updateInterfaceInfo(body: API.InterfaceInfoUpdateParams, options?: { [key: string]: any }) {
  return request<API.Result<void>>('/api/interfaceInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除接口 POST /api/interfaceInfo/delete */
export async function deleteInterfaceInfo(body: API.InterfaceInfoDeleteParams, options?: { [key: string]: any }) {
  return request<API.Result<void>>('/api/interfaceInfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.Result<void>>('/api/rule', {
    method: 'PUT',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    },
  });
}
