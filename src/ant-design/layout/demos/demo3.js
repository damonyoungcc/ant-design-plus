import React, { useState } from 'react';
import Layout from '../index';

export default () => {
  return (
    <>
      <Layout layout="sider" fixSiderbar={false}>
        {new Array(100).fill(1).map((item, index) => {
          return <div key={index}>{index}</div>;
        })}
      </Layout>
    </>
  );
};
