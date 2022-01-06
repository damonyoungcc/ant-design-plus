import React from 'react';
import { Button } from 'antd';

export default ({ title }: { title: string }) => (
  <h1>
    <Button type={'primary'}>{title}</Button>
  </h1>
);
