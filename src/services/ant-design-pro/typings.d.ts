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

  // 接口管理 -------------------------------------- start ------------------
  type InterfaceInfoPageParams = {
    name?: string;
    url?: string;
    description?: string;
    status?: number;
    method?: string;
    current?: number;
    pageSize?: number;
  }

  type InterfaceInfoAddParams = {
    name?: string;
    url?: string;
    description?: string;
    method?: string;
    requestHeader?: string;
    responseHeader?: string;
    requestParam?: string;
  }

  type InterfaceInfoUpdateParams = {
    id?: string;
    name?: string;
    url?: string;
    description?: string;
    method?: string;
    requestHeader?: string;
    responseHeader?: string;
    requestParam?: string;
  }

  type InterfaceInfoDeleteParams = {
    id?: string;
  }

  type InterfaceInfoPageResult = {
    records?: InterfaceInfo[];
    total?: number;
    size?: number;
    current?: number;
    pages?: number;
  }

  type InterfaceInfoVOPageResult = {
    records?: InterfaceInfoVO[];
    total?: number;
    size?: number;
    current?: number;
    pages?: number;
  }

  type InterfaceInfo = {
    id?: string;
    createTime?: Date;
    updateTime?: Date;
    isDelete?: number;
    description?: string;
    name?: string;
    url?: string;
    requestHeader?: string;
    responseHeader?: string;
    requestParam?: string;
    status?: number;
    method?: string;
    userId?: string;
  }

  type InterfaceInfoVO = {
    id?: string;
    description?: string;
    name?: string;
    url?: string;
    requestHeader?: string;
    responseHeader?: string;
    requestParam?: string;
    status?: number;
    method?: string;
    userId?: string;
    username?: string;
  }

  type OnlineCallRequest = {
    // 接口的id
    id?: string;
    param?: object;
  }

  type InterfaceReleaseOrOfflineRequest = {
    // 接口的id
    id?: string;
  }

  type ViewAkSkVO = {
    accessKey?: string;
    secretKey?: string;
  }

  type CheckViewChanceVO = {
    hasChance?: boolean;
    message?: string;
  }
  // 接口管理 --------------------------------- end -----------------------

  type PageParams = {
    current?: number;
    pageSize?: number;
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
}
