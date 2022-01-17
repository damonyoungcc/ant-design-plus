import React, { ReactNode } from 'react';
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
          trigger="auto"
          style={{ width: 170 }}
          placeholder="页面挂载时请求异常"
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
            }
          }}
          onChange={handleChange}
        />
      </Space>
    </>
  );
};
