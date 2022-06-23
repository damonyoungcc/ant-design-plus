import React, { useEffect, useState } from 'react';
import { Layout, Skeleton, Menu } from 'antd';
import classNames from 'classnames';

import { classPrefix } from '../constant';
import { render } from '@testing-library/react';
import { isFunction } from 'lodash';

const { Sider } = Layout;
const prefixCls = `${classPrefix}-siderLayout-sider`;

const SiderComponent = (p) => {
  const {
    fixSiderbar,
    navTheme,
    siderWidth,
    collapsed,
    collapsedWidth,
    requestMenuData,
    menuHeaderRender,
    onMenuItemClick,
    logo,
    title,
  } = p;
  const className = classNames(prefixCls, `${prefixCls}-${navTheme}`, {
    [`${prefixCls}-fixed`]: fixSiderbar,
  });

  const [loading, setLoading] = useState(false);
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    initMenuData();
  }, []);

  const initMenuData = async () => {
    setLoading(true);
    try {
      const menuData = await requestMenuData();
      setMenuData(menuData);
    } finally {
      setLoading(false);
    }
  };

  const renderMenu = () => {
    console.log(menuData);
    if (loading) {
      return (
        <div style={{ padding: 24 }}>
          <Skeleton
            active
            title={false}
            paragraph={{
              rows: 6,
            }}
          />
        </div>
      );
    }
    if (!menuData && (menuData || []).length < 1) {
      return null;
    }
    return <Menu mode={'inline'} items={menuData} theme={navTheme} onClick={onMenuItemClick} />;
  };

  const renderLogoDom = () => {
    // 传入false代表不渲染logo 和 title
    if (menuHeaderRender === false) {
      return null;
    }
    if (isFunction(menuHeaderRender)) {
      return menuHeaderRender(logo, title);
    }
    return (
      <>
        {renderLogo()}
        <h1>{title}</h1>
      </>
    );
  };

  const renderLogo = () => {
    if (typeof logo === 'string') {
      return <img src={logo} alt="logo" />;
    }
    return logo;
  };

  return (
    <>
      {fixSiderbar && (
        <div
          style={{
            width: collapsed ? 48 : siderWidth,
            overflow: 'hidden',
            flex: `0 0 ${collapsed ? 48 : siderWidth}px`,
            maxWidth: collapsed ? 48 : siderWidth,
            minWidth: collapsed ? 48 : siderWidth,
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
        <div className={`${prefixCls}-children`}>
          <div
            className={classNames(`${prefixCls}-logo`, {
              [`${prefixCls}-logo-collapsed`]: collapsed,
            })}
          >
            <a>{renderLogoDom()}</a>
          </div>
          <div style={{ flex: '1', overflow: 'hidden auto' }}>{renderMenu()}</div>
        </div>
      </Sider>
    </>
  );
};

export default SiderComponent;
