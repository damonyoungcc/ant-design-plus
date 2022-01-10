import React, { ReactNode } from 'react';
import AsyncSelect from '../index';

type OptionType = {
  label: ReactNode;
  value: string;
  value2?: string;
};

const fetchData = (): Promise<{
  data: OptionType[];
  value1?: string;
}> => {
  const options: OptionType[] = [
    {
      label: '春',
      value: 'spring',
    },
    {
      label: '夏',
      value: 'summer',
    },
    {
      label: '秋',
      value: 'autumn',
    },
    {
      label: '冬',
      value: 'winter',
    },
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: options,
      });
    }, 1000);
  });
};

export default () => {
  return (
    <>
      <AsyncSelect<OptionType>
        optionLabelProp="label"
        allowClear
        style={{ width: 140 }}
        request={async () => {
          const res = await fetchData();
          const { data } = res || {};
          return data;
        }}
        trigger="auto"
        onLabel={(item) => item.label}
        onValue={(item) => item?.value}
        onOption={(item) => item?.label + ' 🤡'}
      />
    </>
  );
};
