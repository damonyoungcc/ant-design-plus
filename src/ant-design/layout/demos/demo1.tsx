import React, { useState } from 'react';
import { antd } from '@yang/ant-design-plus';

const { Layout } = antd;

export default () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <Layout />
      {counter}
    </>
  );
};
