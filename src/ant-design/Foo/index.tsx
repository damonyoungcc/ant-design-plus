import React from 'react';
import { Input } from 'antd';
export default ({ title }: { title: string }) => (
  <h1>
    {title}
    <Input placeholder={title} />
  </h1>
);
