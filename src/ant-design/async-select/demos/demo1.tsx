import React, { ReactNode } from 'react';
import { Space, Select } from 'antd';

import { antd } from '@yang/ant-design-plus';
import { mockAsyncFetchData } from './utils/mock';

const { AsyncSelect } = antd;
const { Option } = AsyncSelect;

type OptionType = {
  value: number;
  label: ReactNode;
};

export default () => {
  // TODO value类型有问题
  const handleChange = (value: unknown) => {
    console.log(value);
  };
  const handleChange1 = (value: unknown) => {
    console.log(value);
  };
  return (
    <>
      <Select
        defaultValue={'1'}
        options={[{ label: 1, value: 1 }]}
        onChange={handleChange1}
      ></Select>
      <Space>
        <AsyncSelect<OptionType>
          style={{ width: 120 }}
          request={async () => {
            const res = await mockAsyncFetchData<OptionType>(1000);
            const { data } = res || {};
            return data;
          }}
          onChange={handleChange}
        />
        <AsyncSelect<OptionType>
          trigger="auto"
          style={{ width: 120 }}
          request={async () => {
            const res = await mockAsyncFetchData<OptionType>(1000);
            const { data } = res || {};
            return data;
          }}
          onChange={handleChange}
        />
        <AsyncSelect<OptionType>
          style={{ width: 120 }}
          request={async () => {
            const res = await mockAsyncFetchData<OptionType>(1000);
            const { data } = res || {};
            return data;
          }}
          onChange={handleChange}
          onOption={(item) => {
            return (
              <>
                {item?.map((ele, index) => {
                  return (
                    <Option key={index} label={ele?.label} value={ele.value}>
                      {ele?.label}
                    </Option>
                  );
                })}
              </>
            );
          }}
        />
      </Space>
    </>
  );
};
