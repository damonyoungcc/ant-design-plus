import React, { ReactNode, useEffect } from 'react';
import AsyncSelect from '../index';

type OptionType = {
  label: ReactNode;
  value: string;
  value1?: string;
};

const fetchData = (): Promise<{
  data: OptionType[];
  value1?: string;
}> => {
  const options: OptionType[] = [
    {
      label: '春天',
      value: 'spring',
    },
    {
      label: '夏天',
      value: 'summer',
    },
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: options,
      });
    }, 300);
  });
};

export default () => {
  return (
    <>
      <AsyncSelect<OptionType>
        allowClear
        style={{ width: 140 }}
        request={async () => {
          const res = await fetchData();
          const { data } = res || {};
          return data;
        }}
        trigger="open"
        onLabel={(item) => item.label}
        onValue={(item) => item.value}
        onOption={(item) => item.label + 'Option'}
      />
    </>
  );
};
