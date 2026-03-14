## 错误码

返回结果中如果存在 Error 这个 key，则表示调用 API 接口失败。Error 底下的 Code 字段表示错误码，当调用失败后，用户可以根据下表确定公共错误原因并采取相应措施。

| 错误代码            | 错误类型        | 描述|
|--------------------|----------------|--------------------------------------|
|InvalidParameter|请求参数非法|缺少必要参数，或者参数值格式不正确，具体错误信息请查看错误描述 message 字段。|
|InvalidParameter.SecretIdNotFound|密钥不存在|用于请求的密钥不存在，请确认后重试。|
|InvalidParameter.SignatureFailure|身份认证失败|身份认证失败，一般是由于签名计算错误导致的。|
|InvalidRequest.Forbidden|拒绝访问|账号被封禁，或者不在接口针对的用户范围内等。|
|InvalidRequest.LimitExceeded|超过配额|请求的次数超过了配额限制，请参考文档请求配额部分。|
|InvalidAction.ActionUnavailable|接口暂时无法访问|当前接口处于停服维护状态，请稍后重试。|
