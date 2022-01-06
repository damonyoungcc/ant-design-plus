import React from 'react';
import { Button } from 'antd-mobile';
import { AntOutline } from 'antd-mobile-icons';
export default ({ title }: { title: string }) => (
  <h1>
    <AntOutline />
    <Button color={'primary'}>{title}</Button>
  </h1>
);
