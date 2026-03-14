import { Card, Form, Input, InputNumber, Select } from 'antd';
import type { FormInstance } from 'antd/lib';
import ReactJson from 'react-json-view';

// 动态表单组件，接收 interfaceinfo 作为 props
const DynamicFormByInterfaceInfo = ({
  form,
  interfaceInfo,
  response,
}: {
  form: FormInstance;
  interfaceInfo: API.InterfaceInfo;
  response: any;
}) => {
  // 1. 解析 requestHeader 为 JSON Schema
  let requestSchema = null;
  if (interfaceInfo.requestHeader) {
    requestSchema = JSON.parse(interfaceInfo.requestHeader);
  }

  // 3. 渲染动态表单项
  const renderFormItems = () => {
    if (!requestSchema) {
      return <p>无需参数</p>;
    }
    return Object.entries(requestSchema.properties || {}).map(
      ([fieldKey, fieldSchema]) => {
        const schema = fieldSchema as { type: string; enum?: string[] };
        const rules = [];
        if (requestSchema.required?.includes(fieldKey)) {
          rules.push({ required: true, message: `请输入${fieldKey}` });
        }

        return (
          <Form.Item
            key={fieldKey}
            name={fieldKey}
            label={fieldKey}
            rules={rules}
          >
            {schema.type === 'string' &&
              (schema.enum ? (
                <Select
                  placeholder={`请选择${fieldKey}`}
                  options={schema.enum.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              ) : (
                <Input placeholder={`请输入${fieldKey}`} />
              ))}
            {schema.type === 'number' && (
              <InputNumber
                placeholder={`请输入${fieldKey}`}
                style={{ width: '100%' }}
              />
            )}
          </Form.Item>
        );
      },
    );
  };

  // 4. 组件渲染
  return (
    <>
      <Card title="接口信息" style={{ width: '100%' }}>
        <p>接口名称：{interfaceInfo.name}</p>
        <p>请求方法：{interfaceInfo.method}</p>
        <p>接口描述：{interfaceInfo.description}</p>
        <p>请求路径：{interfaceInfo.url}</p>
      </Card>
      <Card title="参数信息" style={{ width: '100%' }}>
        <Form form={form} layout="vertical" title="接口参数">
          {renderFormItems()}
        </Form>
      </Card>
      <Card title="请求结果" style={{ width: '100%' }}>
        {response ? (
          <ReactJson
            src={response}
            name={null}
            theme="rjv-default"
            iconStyle="triangle"
            indentWidth={2}
            collapsed={false}
            displayDataTypes={false}
          />
        ) : (
          <p>暂无请求结果</p>
        )}
      </Card>
    </>
  );
};

export default DynamicFormByInterfaceInfo;
