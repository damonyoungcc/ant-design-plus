import React, { ReactNode, useState } from 'react';
import { Space, message } from 'antd';
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

  return (
    <>
      <Space>
        <AsyncSelect
          style={{ width: 150 }}
          placeholder="请求异常"
          request={async () => {
            try {
              const res = await mockAsyncFetchData<ValueType>({
                delay: 1000,
                responseType: 'fail',
              });
              const { data } = res || {};
              return data;
            } catch (error: any) {
              console.log(error?.message);
              message.error(error?.message);
            }
          }}
          onChange={handleChange}
        />
        <AsyncSelect
          style={{ width: 150 }}
          placeholder="随机返回结果"
          request={async () => {
            try {
              const res = await mockAsyncFetchData<ValueType>({
                delay: 1000,
                responseType: 'random',
              });
              const { data } = res || {};
              return data;
            } catch (error: any) {
              console.log(error?.message);
              message.error(error?.message);
            }
          }}
          onChange={handleChange}
        />
      </Space>
    </>
  );
};
