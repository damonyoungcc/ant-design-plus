import React from 'react';
import Sider from './siderLayout';
import Top from './topLayout';

import { mergeProps } from '../utils';
import { render } from '@testing-library/react';
import { defaultLayoutProps } from './constant';

const Layout = (p) => {
  const props = mergeProps(defaultLayoutProps, p);
  const { layout, ...restProps } = props;
  console.log('layout', props);

  const render = () => {
    if (layout === 'sider') {
      return <Sider {...restProps} />;
    }
    if (layout === 'top') {
      return <Top {...restProps} />;
    }
  };

  return <>{render()}</>;
};

export default Layout;
