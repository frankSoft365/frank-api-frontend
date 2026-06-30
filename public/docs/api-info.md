## 接口信息

### getMyName

- 接口名称：getMyName
- 路径：/api/getMyName
- 请求方法：POST
- 描述：传递 name 参数，返回包含该名字的句子

**请求头**

```json
{
  "Content-Type": "application/json"
}
```

**响应头**

```json
{
  "Content-Type": "application/json"
}
```

**请求参数样例**

```json
{
  "name": "frank"
}
```

**返回样例**

```json
{
  "response": {
    "nameMessage": "My name is frank",
    "requestId": "433825ad-f609-4e3a-a91f-6f741a9d7357"
  }
}
```

**调用示例**

```java
import com.microsoft.frankapisdk.client.FrankApiClient;
import com.microsoft.frankapisdk.commen.BaseApiResponse;
import com.microsoft.frankapisdk.model.User;
import jakarta.annotation.Resource;

public class FrankApiCall {

    @Resource
    private FrankApiClient frankApiClient;

    public BaseApiResponse callApi() {
        User user = new User("frank");
        BaseApiResponse baseApiResponse = frankApiClient.callGetMyName(user);
        System.out.println(baseApiResponse);
        return baseApiResponse;
    }
}
```

### SimpleHello

- 接口名称：SimpleHello
- 路径：/api/simpleHello
- 请求方法：GET
- 描述：输出 Hello World

**请求头**

```json
{
  "Content-Type": "application/json"
}
```

**响应头**

```json
{
  "Content-Type": "application/json"
}
```

**请求参数样例**

```json
{}
```

**返回样例**

```json
{
  "response": {
    "helloMessage": "Hello World!",
    "requestId": "433825ad-f609-4e3a-a91f-6f741a9d7357"
  }
}
```

**调用示例**

```java
import com.microsoft.frankapisdk.client.FrankApiClient;
import com.microsoft.frankapisdk.commen.BaseApiResponse;
import jakarta.annotation.Resource;

public class FrankApiCall {

    @Resource
    private FrankApiClient frankApiClient;

    public BaseApiResponse callApi() {
        BaseApiResponse baseApiResponse = frankApiClient.callSimpleHello();
        System.out.println(baseApiResponse);
        return baseApiResponse;
    }
}
```
