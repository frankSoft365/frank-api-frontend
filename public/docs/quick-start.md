## 快速开始

### 1. 获取 accessKey 与 secretKey 

### 2. 安装 Maven 依赖

```xml
<!-- frank-api-sdk -->
<dependency>
    <groupId>com.microsoft</groupId>
    <artifactId>frank-api-sdk</artifactId>
    <version>1.0.0</version>
</dependency>
```

### 3. 配置 application.yml 文件

```yml
# frank-api-client 配置
frank:
  api:
    client:
      accessKeyId: 你的 accessKey
      accessKeySecret: 你的 secretKey
      baseUrl: 接口服务器路径
```

### 4. 调用示例

frankApiClient 实例调用接口方法时必须传入接口id，接口id由[接口信息](#接口信息)查询获得。

#### 测试代码：

```java
package com.example;

import com.microsoft.frankapisdk.client.FrankApiClient;
import com.microsoft.frankapisdk.commen.BaseApiResponse;
import jakarta.annotation.Resource;

public class TestFrankApiClient {

    @Resource
    private FrankApiClient frankApiClient;
    
    public void testFrankApiClient() throws Exception {
        // 2025807209132167169L 为该接口的id
        BaseApiResponse baseApiResponse = frankApiClient.callSimpleHello(2025807209132167169L);
        System.out.println(baseApiResponse);
    }
}
```

#### 响应值：

```json
{
    "response": {
        "helloMessage": "Hello World!",
        "requestId": "433825ad-f609-4e3a-a91f-6f741a9d7357"
    }
}
```