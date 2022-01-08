import React from 'react';
import { Button } from 'antd';
import './index.less';

export default ({ title }: { title: string }) => (
  <h1>
    <Button type={'primary'} className="test-less">
      {title}
    </Button>
  </h1>
);
