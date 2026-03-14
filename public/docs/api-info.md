## 接口信息

### getMyName
接口 ID：2030307931321294849
请求地址：http://localhost:8123/api/getMyName
请求方法：POST
接口状态：启用
接口描述：传递User对象一个名字，将返回包含名字的句子
请求参数：
```json
{
  "required":["name"],
  "type":"object",
  "properties":{
    "name":{
      "type":"string",
      "description":"姓名",
      "example":"frank"
    }
  },
  "description":"/api/getMyName-请求参数实体"
}
```

### allPosition
接口 ID：2023026561310969857
请求地址：http://frankapi/allPosition
请求方法：GET
接口状态：禁用
接口描述：获取所有的可用地域
请求参数：无

### helloWorld!
接口 ID：2025807209132167169
请求地址：http://localhost:8123/api/simpleHello
请求方法：GET
接口状态：启用
接口描述：输出Hello World
请求参数：无

### 模拟接口
接口 ID：2024802114546376705
请求地址：http://frank-api/hohohoho
请求方法：POST
接口状态：禁用
接口描述：一个模拟接口
请求参数：无

### 模拟接口3
接口 ID：2024848555079864321
请求地址：http://frank-api/bbbbbb
请求方法：PUT
接口状态：禁用
接口描述：测试用
请求参数：无

### 模拟接口2
接口 ID：2024847970251280386
请求地址：http://frank-api/aaaaaa
请求方法：DELETE
接口状态：禁用
接口描述：另一个模拟接口
请求参数：无

## 使用说明
1. 接口状态：启用（status=1）可正常调用，禁用（status=0）暂不可用；
2. 接口ID为接口唯一标识，用于接口管理相关操作；
3. getMyName为核心启用接口，调用时需按规范传递name字符串类型参数；
4. 所有接口均为模拟接口，实际调用请根据部署环境调整请求地址。