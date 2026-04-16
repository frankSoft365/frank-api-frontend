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
  return request<API.Result<API.PageResult<API.InterfaceInfo>>>('/api/interfaceInfo/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取分页接口信息VO POST /api/interfaceInfo/list/page/vo */
export async function listInterfaceInfoVOByPage(body: API.InterfaceInfoPageParams, options?: { [key: string]: any }) {
  return request<API.Result<API.InterfaceInfoVOPageResult>>('/api/interfaceInfo/list/page/vo', {
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

/** 在线调用 POST /api/onlineCall */
export async function onlineCallInterface(body: API.OnlineCallRequest, options?: { [key: string]: any }) {
  return request<API.Result<void>>('/api/onlineCall', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发布接口 POST /api/interfaceInfo/release */
export async function releaseInterface(body: API.InterfaceReleaseOrOfflineRequest, options?: { [key: string]: any }) {
  return request<API.Result<void>>('/api/interfaceInfo/release', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 下线接口 POST /api/interfaceInfo/offline */
export async function offlineInterface(body: API.InterfaceReleaseOrOfflineRequest, options?: { [key: string]: any }) {
  return request<API.Result<void>>('/api/interfaceInfo/offline', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看用户 AK/SK（仅一次机会） GET /api/userPaymentAkSk/viewAkSk */
export async function viewAkSk(options?: { [key: string]: any }) {
  return request<API.Result<API.ViewAkSkVO>>('/api/userPaymentAkSk/viewAkSk', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 检查用户是否还有查看 AK/SK 的机会 GET /api/userPaymentAkSk/checkViewChance */
export async function checkViewChance(options?: { [key: string]: any }) {
  return request<API.Result<API.CheckViewChanceVO>>(
    '/api/userPaymentAkSk/checkViewChance',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 获取接口监控概览 POST /api/interfaceMonitoring/overview/admin */
export async function getInterfaceMonitoringOverview(body: API.InterfaceMonitoringOverviewParams, options?: { [key: string]: any }) {
  return request<API.Result<API.InterfaceMonitoringOverviewData>>('/api/interfaceMonitoring/overview/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取接口监控概览 POST /api/interfaceMonitoring/interfaceStat/admin */
export async function getInterfaceMonitoringInterfaceStat(body: API.InterfaceStatQueryDTO, options?: { [key: string]: any }) {
  return request<API.Result<API.PageResult<API.InterfaceStatVO>>>('/api/interfaceMonitoring/interfaceStat/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户调用次数排名 POST /api/interfaceMonitoring/userCallRank/admin */
export async function getInterfaceMonitoringUserCallRank(body: API.UserCallRankQueryDTO, options?: { [key: string]: any }) {
  return request<API.Result<API.PageResult<API.UserCallRankVO>>>('/api/interfaceMonitoring/userCallRank/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
