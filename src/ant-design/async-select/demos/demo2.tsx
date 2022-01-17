import React, { ReactNode } from 'react';
import { Space } from 'antd';
import { antd } from '@yang/ant-design-plus';

import { mockAsyncFetchData } from '../../../tools/mock';

const { AsyncSelect } = antd;

type ValueType = {
  value: number;
  label: ReactNode;
};

export default () => {
  const handleChange = (value: number) => {
    console.log(`选择了${value}`);
  };

  const onDropdown = (open: boolean) => {
    if (open) {
      console.log('打开时做一些事情');
    } else {
      console.log('关闭时做一些事情');
    }
  };

  return (
    <Space>
      <AsyncSelect
        trigger="auto"
        placeholder="页面挂载时就完成请求"
        style={{ width: 190 }}
        request={async () => {
          const res = await mockAsyncFetchData<ValueType>({ delay: 1000 });
          const { data } = res || {};
          return data;
        }}
        onChange={handleChange}
      />
      <AsyncSelect
        trigger="auto"
        defaultOpen
        placeholder="默认展示下拉菜单"
        style={{ width: 190 }}
        request={async () => {
          const res = await mockAsyncFetchData<ValueType>({ delay: 1000 });
          const { data } = res || {};
          return data;
        }}
        onChange={handleChange}
      />
      <AsyncSelect
        trigger="open"
        placeholder="展示下拉菜单时发起请求"
        style={{ width: 200 }}
        request={async () => {
          const res = await mockAsyncFetchData<ValueType>({ delay: 1000 });
          const { data } = res || {};
          return data;
        }}
        onChange={handleChange}
      />
      <AsyncSelect
        trigger="open"
        onDropdownVisibleChange={onDropdown}
        placeholder="监听下拉菜单的开关"
        style={{ width: 200 }}
        request={async () => {
          const res = await mockAsyncFetchData<ValueType>({ delay: 1000 });
          const { data } = res || {};
          return data;
        }}
        onChange={handleChange}
      />
    </Space>
  );
};
