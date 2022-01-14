import React, { ReactNode } from 'react';
import { Space } from 'antd';

import { mockAsyncFetchData } from '../../../tools/mock';

import { antd } from '@yang/ant-design-plus';

const { AsyncSelect } = antd;

type OptionType = {
  value: number;
  label: ReactNode;
};

export default () => {
  const handleChange = (value: number) => {
    console.log(`选择了${value}`);
  };

  return (
    <>
      <Space>
        <AsyncSelect
          trigger="auto"
          placeholder="页面加载时自动请求"
          style={{ width: 170 }}
          request={async () => {
            const res = await mockAsyncFetchData<OptionType>(1000);
            const { data } = res || {};
            return data;
          }}
          onChange={handleChange}
        />
        <AsyncSelect
          trigger="down"
          placeholder="展示下拉框时加载"
          style={{ width: 170 }}
          request={async () => {
            const res = await mockAsyncFetchData<OptionType>(1000);
            const { data } = res || {};
            return data;
          }}
          onChange={handleChange}
        />
        <AsyncSelect
          trigger="open"
          placeholder="打开下拉框时加载"
          style={{ width: 170 }}
          request={async () => {
            const res = await mockAsyncFetchData<OptionType>(1000);
            const { data } = res || {};
            return data;
          }}
          onChange={handleChange}
        />
      </Space>
    </>
  );
};
