import React, { useState } from 'react';
import { Layout } from 'antd';
import ResizeObserver from 'rc-resize-observer';

import Sider from './Sider';
import Header from './Header';
import Content from './Content';

import './index.less';
import { mergeProps, isBrowser } from '../../utils';
import { defaultLayoutProps, classPrefix } from '../constant';

const defaultWidth = isBrowser() ? document.body.clientWidth : 1024;

const SiderLayout = ({ layout, ...p }) => {
  const props = mergeProps(defaultLayoutProps, p);

  const [width, setWidth] = useState(defaultWidth);

  const renderSiderDom = () => {
    return <Sider {...props} />;
  };
  const renderHeaderDom = () => {
    return <Header {...props} />;
  };

  const renderContentDom = () => {
    return <Content {...props} />;
  };

  return (
    <ResizeObserver
      onResize={(size) => {
        setWidth(size.width);
      }}
    >
      <div className={`${classPrefix}-siderLayout`}>
        <Layout>
          {renderSiderDom()}
          <div className={`${classPrefix}-siderLayout-main`}>
            {/* {renderHeaderDom()} */}
            {renderContentDom()}
          </div>
        </Layout>
      </div>
    </ResizeObserver>
  );
};

export default SiderLayout;
