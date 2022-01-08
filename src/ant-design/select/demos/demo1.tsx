import React from 'react';
import { antd } from '@yang/ant-design-plus';
const { AsyncSelect } = antd;
export default () => {
  return <AsyncSelect options={[{ label: '1', value: '1' }]}></AsyncSelect>;
};
