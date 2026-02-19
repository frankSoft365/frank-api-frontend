// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Result<T> = {
    code: number;
    data: T;
    message: string;
    description: string;
  }

  type CurrentUser = {
    username?: string;
    id?: number;
    gender?: number;
    phone?: string;
    avatar?: string;
    createTime?: Date;
    userStatus?: number;
    email?: string;
    userAccount?: string;
    role?: number;
  };

  type LoginResult = {
    id?: number;
    userAccount?: string;
    token?: string;
  };

  type RegisterResult = number;

  type UserImportResponse = {
    isSuccess?: boolean;
    // 总共有多少条数据
    total?: number;
    // 成功数据数
    successCount?: number;
    // 不符合要求数据数
    errorCount?: number;
    // 导入失败数据详情
    errorMessageList?: string[];
    // 成功数据示例
    succesList?: CurrentUser[];
  }

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    userAccount?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };
  type RegisterParams = {
    userAccount?: string;
    password?: string;
    checkPassword?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
