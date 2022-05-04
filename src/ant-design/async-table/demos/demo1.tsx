import React, { useState } from 'react';
import { antd } from '@yang/ant-design-plus';
import { mockAsyncFetchData } from '../../../tools/mock';

const { AsyncTable } = antd;

export default () => {
  return (
    <>
      <AsyncTable
        request={async () => {
          const res = await mockAsyncFetchData({
            delay: 1000,
            options: [
              {
                id: '1',
                name: '1',
                age: '1',
                desc: '1',
              },
              {
                id: '2',
                name: '2',
                age: '2',
                desc: '2',
              },
              {
                id: '3',
                name: '3',
                age: '3',
                desc: '3',
              },
            ],
          });
          const { data } = res || {};
          return data;
        }}
      />
    </>
  );
};
