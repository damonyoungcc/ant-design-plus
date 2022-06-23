import React from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';

import { classPrefix } from '../constant';

const { Header } = Layout;
const prefixCls = `${classPrefix}-siderLayout`;

const HeaderComponent = (p) => {
  const { fixedHeader, fixSiderbar, headerHeight, headerTheme, siderWidth } = p;
  const className = classNames(`${prefixCls}-header`, `${prefixCls}-header-${headerTheme}`, {
    [`${prefixCls}-header-fixed`]: fixedHeader,
  });
  const headerWidth = fixedHeader ? `calc(100% - ${siderWidth}px)` : '100%';

  return (
    <>
      {fixedHeader && (
        <Header
          style={{
            height: headerHeight,
            lineHeight: `${headerHeight}px`,
            background: 'transparent',
          }}
        />
      )}
      <Header
        className={className}
        style={{
          width: headerWidth,
          height: headerHeight,
          lineHeight: `${headerHeight}px`,
          boxShadow: '0 1px 4px rgb(0 21 41 / 8%)',
          overflow: 'hidden',
        }}
      >
        Header
      </Header>
    </>
  );
};

export default HeaderComponent;
