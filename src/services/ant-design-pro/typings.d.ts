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

  type PageResult<T> = {
    records?: T[];
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

  // 接口监控概览请求参数
  type InterfaceMonitoringOverviewParams = {
    startTime: string;
    endTime: string;
    queryTime: string;
  };

  // 接口监控概览响应数据
  type InterfaceMonitoringOverviewData = {
    totalCall: number;
    successRate: number;
    avgCost: number;
    callTrend: Array<{
      time: string;
      value: number;
    }>;
  };

  type InterfaceStatVO = {
    interfacePath?: string; // 接口地址
    requestMethod?: string; // 请求方法

    total?: number;     // 总调用次数
    success?: number;   // 成功次数
    fail?: number;      // 失败次数
    successRate?: number;// 成功率 %

    avgCost?: number; // 平均耗时
    maxCost?: number;   // 最大耗时
  };

  type InterfaceStatQueryDTO = {
    // 当前页号
    current?: number;
    // 每页大小
    pageSize?: number;
    // 排序字段
    sortField?: string;
    // 排序顺序（默认升序）
    sortOrder?: string;
    // 开始时间
    startTime?: string;
    // 结束时间
    endTime?: string;
    // 查询时间
    queryTime?: string;
    // 查询路径 模糊查询
    interfacePath?: string;
    // 请求方法 POST&GET...
    requestMethod?: string;
    // 请求结果 0成功&1失败&null全选
    requestResult?: number;
  };

  type UserCallRankVO = {
    userId?: string;  // 用户ID
    totalCall?: number;     // 总调用次数
    interfaceCount?: number; // 调用接口数
    successRate?: number;// 成功率 %
    avgCost?: number; // 平均耗时
    lastCallTime?: Date; // 最后调用时间
  };

  type UserCallRankQueryDTO = {
    // 当前页号
    current?: number;
    // 每页大小
    pageSize?: number;
    // 开始时间
    startTime?: string;
    // 结束时间
    endTime?: string;
    // 查询时间
    queryTime?: string;
    // 查询用户ID
    userId?: string;
  };
}
