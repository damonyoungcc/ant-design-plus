import React, { ReactNode, useState } from 'react';
import { Space } from 'antd';

import { mockAsyncFetchData } from '../../../tools/mock';

import { antd } from '@yang/ant-design-plus';

const { AsyncSelect } = antd;
const { Option } = AsyncSelect;

type ValueType = {
  id: number;
  name: ReactNode;
};

const defaultValues: ValueType[] = [
  {
    name: '小明 👦🏻',
    id: 1,
  },
  {
    name: '小红 👧🏻',
    id: 2,
  },
  {
    name: '小丑 🤡',
    id: 3,
  },
];

export default () => {
  const [value, setValue] = useState<number>();

  const handleChange = (value: number) => {
    console.log(`选择了${value}`);
    setValue(value);
  };

  return (
    <>
      <Space>
        <AsyncSelect
          value={value}
          style={{ width: 150 }}
          placeholder="我可以自定义"
          request={async () => {
            const res = await mockAsyncFetchData<ValueType>(1000, defaultValues);
            const { data } = res || {};
            return data;
          }}
          onChange={handleChange}
          customOption={(item: ValueType, index: number) => {
            return (
              <Option value={item.id} disabled={index > 1} key={item.id}>
                {item.name + ' 👉🏻  😁'}
              </Option>
            );
          }}
        />
      </Space>
    </>
  );
};
