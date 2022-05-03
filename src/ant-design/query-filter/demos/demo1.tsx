import React from 'react';
import { Form, Input } from 'antd';
import { antd } from '@yang/ant-design-plus';

const { QueryFilter } = antd;

export default () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <QueryFilter onFinish={onFinish} labelWidth={50}>
        <Form.Item label="名字" name="name">
          <Input placeholder="请输入名字" />
        </Form.Item>
        <Form.Item label="年龄" name="age">
          <Input placeholder="请输入年龄" />
        </Form.Item>
      </QueryFilter>
    </>
  );
};
