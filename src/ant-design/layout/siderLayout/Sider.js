import React from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';

import './sider.less';
import { classPrefix } from '../constant';

const { Sider } = Layout;
const prefixCls = `${classPrefix}-siderLayout`;

const SiderComponent = (p) => {
  const { fixSiderbar, navTheme, siderWidth, collapsed, collapsedWidth } = p;
  const className = classNames(`${prefixCls}-sider`, `${prefixCls}-sider-${navTheme}`, {
    [`${prefixCls}-sider-fixed`]: fixSiderbar,
  });
  return (
    <>
      {fixSiderbar && (
        <div
          style={{
            width: siderWidth,
            overflow: 'hidden',
            flex: `0 0 ${siderWidth}px`,
          }}
        />
      )}
      <Sider
        theme={navTheme}
        width={siderWidth}
        className={className}
        collapsible
        collapsed={collapsed}
        trigger={null}
      >
        {/* {this.renderGlobalHeaderTitle(layout)} */}
        {/* <div className="menu-wrapper">{this.renderMenu()}</div> */}
        111
      </Sider>
    </>
  );
};

export default SiderComponent;
