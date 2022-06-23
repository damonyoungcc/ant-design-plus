import React, { useEffect, useState } from 'react';
import { Layout, Skeleton, Menu } from 'antd';
import classNames from 'classnames';

import { classPrefix } from '../constant';
import { render } from '@testing-library/react';
import { isArray, isFunction } from 'lodash';
import { conversionPath, isUrl } from '../../utils';
const { Sider } = Layout;
const prefixCls = `${classPrefix}-siderLayout-sider`;
const logoImage = 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg';

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
    subMenuItemRender,
    menuItemRender,
    prefixConfig,
    logo,
    title,
  } = p;
  // 组合sider的className
  const className = classNames(prefixCls, `${prefixCls}-${navTheme}`, {
    [`${prefixCls}-fixed`]: fixSiderbar,
  });

  const [loading, setLoading] = useState(false);
  const [menuData, setMenuData] = useState(null);

  const init = async () => {
    setLoading(true);
    try {
      const menuData = await requestMenuData();
      setMenuData(menuData);
    } finally {
      setLoading(false);
    }
  };

  // 页面挂载时请求menuData的数据
  useEffect(() => {
    if (isFunction(requestMenuData)) {
      init();
    }
  }, []);

  // 处理menuData的数据
  const getNavMenuItems = (menusData = [], isChildren) =>
    menusData.map((item) => getSubMenuOrItem(item, isChildren)).filter((item) => item);

  const getSubMenuOrItem = (item, isChildren) => {
    const children = (item || {}).children;

    if (Array.isArray(children) && children.length > 0) {
      const { name } = item || {};
      const title = subMenuItemRender ? subMenuItemRender(item) : name;
      return {
        label: name,
        children: getNavMenuItems(children, true),
        key: item.key || item.path,
      };
    }
    return {
      label: getMenuItemPath(item, isChildren),
      key: item.key || item.path,
      onClick: (e) => {
        if (isUrl(item?.path)) {
          window.open(item.path);
        } else {
          window.location.hash = item.path;
        }
      },
    };
  };

  const getMenuItemPath = (item, isChildren) => {
    const itemPath = conversionPath(item.path || '/');
    const { name, icon } = item;
    const isHttpUrl = isUrl(itemPath);

    const defaultItem = (
      <span
        className={classNames(`${prefixCls}-menu-item`, {
          [`${prefixCls}-menu-item-link`]: isHttpUrl,
        })}
      >
        {icon}
        <span className={`${prefixCls}-menu-item-title`}>{name + 2}</span>
      </span>
    );

    if (menuItemRender) {
      const renderItemProps = {
        ...item,
        isUrl: isHttpUrl,
        itemPath,
        onClick: () => {
          if (isHttpUrl) window.open(itemPath);
        },
        children: undefined,
      };
      return menuItemRender(renderItemProps, defaultItem);
    }
    return defaultItem;
  };

  const renderMenu = () => {
    // loading时展示骨架屏
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
    // 没有数据则什么都不展示
    if (!menuData && (menuData || []).length < 1) {
      return null;
    }
    // 渲染Menu
    return <Menu mode={'inline'} items={getNavMenuItems(menuData, false)} theme={navTheme} />;
  };

  // 渲染头部的logo和title
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
        <img src={logo || logoImage} alt="logo" />
        <h1>{title}</h1>
      </>
    );
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
