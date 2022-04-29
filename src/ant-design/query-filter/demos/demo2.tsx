import React from 'react';
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/es/form';

import { antd } from '@yang/ant-design-plus';

const { QueryFilter } = antd;

export default class Demo extends React.Component {
  formRef = React.createRef<FormInstance>();

  onFinish = (values: any) => {
    console.log(values);
  };

  render() {
    return (
      <>
        <QueryFilter ref={this.formRef} onFinish={this.onFinish}>
          <Form.Item
            label="名字前缀"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="请输入名字" />
          </Form.Item>
          <Form.Item label="年龄人" name="age">
            <Input placeholder="请输入年龄" />
          </Form.Item>
        </QueryFilter>
      </>
    );
  }
}
