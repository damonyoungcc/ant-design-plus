import React, { ReactNode, useState } from 'react';
import { Space } from 'antd';

import { mockAsyncFetchData } from '../../../tools/mock';

import { antd } from '@yang/ant-design-plus';

const { AsyncSelect } = antd;
const { Option } = AsyncSelect;

type OptionType = {
  value: number;
  label: ReactNode;
  a: 1;
};

type OtherType = {
  id: number;
  name: string;
};

export default () => {
  const [value, setValue] = useState<number>();

  const handleChange = (value: number) => {
    console.log(value);
    setValue(value);
  };

  return (
    <>
      <Space>
        <AsyncSelect
          defaultValue={1}
          value={value}
          style={{ width: 120 }}
          request={async () => {
            const res = await mockAsyncFetchData<OptionType>(1000);
            const { data } = res || {};
            return data;
          }}
          onChange={handleChange}
        />
        <AsyncSelect
          defaultValue={1}
          trigger="auto"
          style={{ width: 120 }}
          request={async () => {
            const res = await mockAsyncFetchData<OptionType>(1000);
            const { data } = res || {};
            return data;
          }}
          onChange={handleChange}
        />
        <AsyncSelect
          trigger="down"
          style={{ width: 120 }}
          request={async () => {
            const res = await mockAsyncFetchData<OptionType>(1000);
            const { data } = res || {};
            return data;
          }}
          onChange={handleChange}
        />
        <AsyncSelect
          style={{ width: 120 }}
          request={async () => {
            const res = await mockAsyncFetchData<OptionType>(1000);
            const { data } = res || {};
            return data;
          }}
          optionLabelProp="value"
          onChange={handleChange}
          customOption={(item: OptionType, index: number) => {
            return (
              <Option value={item.value} disabled={index > 1} key={item.value}>
                {item.label + ' 1'}
              </Option>
            );
          }}
        />
        <AsyncSelect
          style={{ width: 120 }}
          request={async () => {
            const res = await mockAsyncFetchData<OptionType>(1000);
            const { data } = res || {};
            return data;
          }}
          optionLabelProp="value"
          onChange={handleChange}
          customOption={(item: OptionType, index: number) => {
            return (
              <Option value={item.value} disabled={index > 1} key={item.value}>
                {item.label + ' 1'}
              </Option>
            );
          }}
        />
        <AsyncSelect
          style={{ width: 120 }}
          request={async () => {
            const res = await mockAsyncFetchData<OtherType>(1000, true, [
              { id: 1, name: 'A' },
              { id: 2, name: 'B' },
            ]);
            const { data } = res || {};
            return data;
          }}
          onChange={handleChange}
          customOption={(item: OtherType, index: number) => {
            return (
              <Option value={item.id} disabled={index > 0} key={item.id}>
                {item.name + ' + 1'}
              </Option>
            );
          }}
        />
        <AsyncSelect style={{ width: 120 }} onChange={handleChange}>
          <Option value="1">1</Option>
        </AsyncSelect>
      </Space>
    </>
  );
};
