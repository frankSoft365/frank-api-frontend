// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.Result<API.CurrentUser>>('/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.Result<API.LoginResult>>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 注册接口 POST /user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.Result<API.RegisterResult>>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户列表 GET /user/search?username=example */
export async function getUserList(params?: { username?: string }, options?: { [key: string]: any }) {
  return request<API.Result<API.CurrentUser[]>>('/user/search', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 批量导入用户信息 POST /user/batchImportUser */
export async function batchImportUser(body: FormData, options?: { [key: string]: any }) {
  return request<API.Result<API.UserImportResponse>>('/user/batchImportUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户信息 PUT /user/update */
export async function updateUserInfo(body: API.CurrentUser, options?: { [key: string]: any }) {
  return request<API.Result<void>>('/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 上传用户头像 POST /upload */
export async function uploadAvatar(body: FormData, options?: { [key: string]: any }) {
  return request<API.Result<string>>('/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取分页接口信息 POST /interfaceInfo/list/page */
export async function listInterfaceInfoByPage(body: API.InterfaceInfoPageParams, options?: { [key: string]: any }) {
  return request<API.Result<API.PageResult<API.InterfaceInfo>>>('/interfaceInfo/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取分页接口信息VO POST /interfaceInfo/list/page/vo */
export async function listInterfaceInfoVOByPage(body: API.InterfaceInfoPageParams, options?: { [key: string]: any }) {
  return request<API.Result<API.InterfaceInfoVOPageResult>>('/interfaceInfo/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加一个接口 POST /interfaceInfo/add */
export async function addInterfaceInfo(body: API.InterfaceInfoAddParams, options?: { [key: string]: any }) {
  return request<API.Result<number>>('/interfaceInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id查询接口信息 GET /interfaceInfo/get/vo?id=248389289820203 */
export async function getInterfaceInfoById(params?: { id: string }, options?: { [key: string]: any }) {
  return request<API.Result<API.InterfaceInfo>>('/interfaceInfo/get/vo', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 修改接口 POST /interfaceInfo/update */
export async function updateInterfaceInfo(body: API.InterfaceInfoUpdateParams, options?: { [key: string]: any }) {
  return request<API.Result<void>>('/interfaceInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除接口 POST /interfaceInfo/delete */
export async function deleteInterfaceInfo(body: API.InterfaceInfoDeleteParams, options?: { [key: string]: any }) {
  return request<API.Result<void>>('/interfaceInfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 在线调用 POST /onlineCall */
export async function onlineCallInterface(body: API.OnlineCallRequest, options?: { [key: string]: any }) {
  return request<API.Result<void>>('/onlineCall', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发布接口 POST /interfaceInfo/release */
export async function releaseInterface(body: API.InterfaceReleaseOrOfflineRequest, options?: { [key: string]: any }) {
  return request<API.Result<void>>('/interfaceInfo/release', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 下线接口 POST /interfaceInfo/offline */
export async function offlineInterface(body: API.InterfaceReleaseOrOfflineRequest, options?: { [key: string]: any }) {
  return request<API.Result<void>>('/interfaceInfo/offline', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看用户 AK/SK（仅一次机会） GET /userPaymentAkSk/viewAkSk */
export async function viewAkSk(options?: { [key: string]: any }) {
  return request<API.Result<API.ViewAkSkVO>>('/userPaymentAkSk/viewAkSk', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 检查用户是否还有查看 AK/SK 的机会 GET /userPaymentAkSk/checkViewChance */
export async function checkViewChance(options?: { [key: string]: any }) {
  return request<API.Result<API.CheckViewChanceVO>>(
    '/userPaymentAkSk/checkViewChance',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 获取接口监控概览 POST /interfaceMonitoring/overview/admin */
export async function getInterfaceMonitoringOverview(body: API.InterfaceMonitoringOverviewParams, options?: { [key: string]: any }) {
  return request<API.Result<API.InterfaceMonitoringOverviewData>>('/interfaceMonitoring/overview/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取接口监控概览 POST /interfaceMonitoring/interfaceStat/admin */
export async function getInterfaceMonitoringInterfaceStat(body: API.InterfaceStatQueryDTO, options?: { [key: string]: any }) {
  return request<API.Result<API.PageResult<API.InterfaceStatVO>>>('/interfaceMonitoring/interfaceStat/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户调用次数排名 POST /interfaceMonitoring/userCallRank/admin */
export async function getInterfaceMonitoringUserCallRank(body: API.UserCallRankQueryDTO, options?: { [key: string]: any }) {
  return request<API.Result<API.PageResult<API.UserCallRankVO>>>('/interfaceMonitoring/userCallRank/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户调用总览 POST /interfaceMonitoring/overview/user */
export async function getUserMonitorOverviewVO(body: API.InterfaceMonitoringOverviewParams, options?: { [key: string]: any }) {
  return request<API.Result<API.InterfaceMonitoringOverviewData>>('/interfaceMonitoring/overview/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户调用日志 POST /interfaceMonitoring/interfaceLog/user */
export async function getUserInterfaceLogVO(body: API.UserInterfaceLogQueryDTO, options?: { [key: string]: any }) {
  return request<API.Result<API.PageResult<API.UserInterfaceLogVO>>>('/interfaceMonitoring/interfaceLog/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户调用分布 GET /interfaceMonitoring/callDistribution/user */
export async function getUserCallDistributionVO(options?: { [key: string]: any }) {
  return request<API.Result<API.UserCallDistributionVO>>('/interfaceMonitoring/callDistribution/user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 发送邮箱验证码 POST /email/verification-code/send */
export async function sendEmailVerificationCode(body: API.SendEmailVerificationCodeRequest, options?: { [key: string]: any }) {
  return request<API.Result<API.SendMailResponse>>('/email/verification-code/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}