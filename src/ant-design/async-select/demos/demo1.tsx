import React, { ReactNode } from 'react';
import { Space } from 'antd';

import { antd } from '@yang/ant-design-plus';
import { mockAsyncFetchData } from './utils/mock';

const { AsyncSelect } = antd;

type OptionType = {
  value: number;
  label: ReactNode;
};

const options: OptionType[] = [
  {
    label: '小明 👦🏻',
    value: 1,
  },
  {
    label: '小红 👧🏻',
    value: 2,
  },
  {
    label: '小丑 🤡',
    value: 3,
  },
];

export default () => {
  // TODO value类型有问题
  const handleChange = (value: unknown) => {
    console.log(value);
  };
  return (
    <>
      <Space>
        <AsyncSelect<OptionType>
          style={{ width: 120 }}
          request={async () => {
            const res = await mockAsyncFetchData(options, 1000);
            const { data } = res || {};
            return data;
          }}
          onChange={handleChange}
        />
        <AsyncSelect<OptionType>
          style={{ width: 120 }}
          request={async () => {
            const res = await mockAsyncFetchData(options, 1000);
            const { data } = res || {};
            return data;
          }}
          onChange={handleChange}
        />
        <AsyncSelect<OptionType>
          style={{ width: 120 }}
          request={async () => {
            const res = await mockAsyncFetchData(options, 1000);
            const { data } = res || {};
            return data;
          }}
          onChange={handleChange}
        />
      </Space>
    </>
  );
};
