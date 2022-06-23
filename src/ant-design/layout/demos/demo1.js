import React, { useState } from 'react';
import Layout from '../index';

import { mockMenuFetchData } from '../../utils';

export default () => {
  return (
    <>
      <Layout
        layout="sider"
        requestMenuData={async () => {
          const res = await mockMenuFetchData();
          const { data } = res || {};
          return data;
        }}
        onMenuItemClick={({ item, key, keyPath, domEvent }) =>
          console.log(item, key, keyPath, domEvent)
        }
      >
        {new Array(100).fill(1).map((item, index) => {
          return <div key={index}>{index}</div>;
        })}
      </Layout>
    </>
  );
};
