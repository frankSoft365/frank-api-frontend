## 快速开始

文档更新时间：2026-04-19

### 1. 获取 accessKey 与 secretKey 

注册后，在 个人中心 -> AccessKey 查看 accessKey 与 secretKey。

1. 选择“个人中心”
2. 选择“AccessKey”
3. 首次查看点击查看
4. 保存 accessKey 与 secretKey

### 2. 安装 Maven 依赖

```xml
<!-- frank-api-sdk -->
<dependency>
    <groupId>com.microsoft</groupId>
    <artifactId>frank-api-sdk</artifactId>
    <version>1.1.6</version>
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
      baseUrl: 接口服务器IP
```

### 4. 调用示例

#### 测试代码：

```java
package com.example;

import com.microsoft.frankapisdk.client.FrankApiClient;
import com.microsoft.frankapisdk.commen.BaseApiResponse;
import jakarta.annotation.Resource;

public class TestFrankApiClient {

    @Resource
    private FrankApiClient frankApiClient;
    
    public void testFrankApiClient() {
        BaseApiResponse baseApiResponse = frankApiClient.callSimpleHello();
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