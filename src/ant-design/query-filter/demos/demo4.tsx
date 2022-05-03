import React from 'react';
import { Form, Input, Select } from 'antd';

import { antd } from '@yang/ant-design-plus';

const { QueryFilter } = antd;

export default () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <QueryFilter onFinish={onFinish} form={form} labelWidth={50}>
        <Form.Item label="名字" name="name">
          <Input placeholder="请输入名字" />
        </Form.Item>
        <Form.Item label="性别" name="gender">
          <Select
            options={[
              { label: '男', value: 'male' },
              { label: '女', value: 'female' },
            ]}
          />
        </Form.Item>
        {Form.useWatch('gender', form) === 'female' && (
          <Form.Item name="hobby" label="爱好">
            <Input />
          </Form.Item>
        )}
      </QueryFilter>
    </>
  );
};
