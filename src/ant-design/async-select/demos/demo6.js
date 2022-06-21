import React from 'react';
import { antd } from '@yang/ant-design-plus';

const { AsyncSelect } = antd;

export default () => {
  return <AsyncSelect trigger="auto" style={{ width: '200px' }} />;
};
