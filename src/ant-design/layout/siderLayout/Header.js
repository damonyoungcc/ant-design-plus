import React from 'react';
import { Layout } from 'antd';
const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <>
      {needFixedHeader && (
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
          padding: 0,
          height: headerHeight,
          lineHeight: `${headerHeight}px`,
          width: headerWidth,
          boxShadow: '0 1px 4px rgb(0 21 41 / 8%)',
          zIndex: layout === 'mix' ? 100 : 19,
          right,
          overflow: 'hidden',
        }}
      >
        <div className={`${prefixCls}-nav-header`}>
          <div className={`${prefixCls}-nav-header-main-left`}>
            {this.renderGlobalHeaderTitle()}
          </div>
          <div className={`${prefixCls}-nav-header-menu`}>{this.renderMenu()}</div>
        </div>
      </Header>
    </>
  );
};

export default HeaderComponent;
