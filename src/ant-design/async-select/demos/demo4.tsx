import React, { ReactNode } from 'react';
import { Space, message } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { antd } from '@yang/ant-design-plus';

import { mockAsyncFetchData } from '../../../tools/mock';

const { AsyncSelect } = antd;

type ValueType = {
  id: number;
  name: ReactNode;
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
          placeholder="自定义加载样式"
          customLoading={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Space>
                <ClockCircleOutlined spin />
                {'加载中...'}
              </Space>
            </div>
          }
          request={async () => {
            try {
              const res = await mockAsyncFetchData<ValueType>({
                delay: 1000,
                responseType: 'fail',
              });
              const { data } = res || {};
              return data;
            } catch (error: any) {
              message.error(error?.message);
            }
          }}
          onChange={handleChange}
        />
      </Space>
    </>
  );
};
