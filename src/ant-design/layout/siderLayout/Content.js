import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const ContentComponent = (p) => {
  const { children } = p;
  return (
    <Content>
      <div>
        <div>{children}</div>
      </div>
    </Content>
  );
};

export default ContentComponent;
