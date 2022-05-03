import React, { useState, ReactNode, forwardRef, useEffect } from 'react';
import { Form, Row, Col, Space, Button } from 'antd';
import { FormProps, FormInstance } from 'antd/es/form';
import { DownOutlined } from '@ant-design/icons';
import RcResizeObserver from 'rc-resize-observer';

import { mergeProps } from '../../utils/with-default-props';
import isBrowser from '../../utils/is-browser';

export interface QueryFilterProps extends FormProps {
  children?: ReactNode;
  form?: FormInstance;
  onCollapse?: (collapsed: boolean) => void;
  labelWidth?: number | 'auto';
}

const BREAKPOINTS = {
  default: [
    [0, 531, 1],
    [531, 701, 2],
    [701, 1062, 3],
    [1062, 1352, 3],
    [1352, Infinity, 4],
  ],
} as const;

const defaultProps = {
  labelWidth: 80,
};

const defaultWidth = isBrowser() ? document.body.clientWidth : 1024;

export const QueryFilter = forwardRef<FormInstance, QueryFilterProps>((p, ref) => {
  const props = mergeProps(defaultProps, p);
  const { onCollapse, labelWidth, children, ...restProps } = props;

  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState(defaultWidth);
  const [spanSize, setSpanSize] = useState<number>(0);
  const [showIndex, setShowIndex] = useState<number>(1);

  useEffect(() => {
    const { default: defaultBreakPoints } = BREAKPOINTS;
    const filterItem = defaultBreakPoints.filter((item) => {
      return width >= item[0] && width < item[1];
    });
    setSpanSize(24 / filterItem[0][2]);
    setShowIndex(filterItem[0][2]);
  }, [width]);

  const handleClick = () => {
    setCollapsed(!collapsed);
    onCollapse && onCollapse(collapsed);
  };

  const markFormItem = (children: ReactNode): ReactNode[] => {
    let index = 0;
    return (
      React.Children.map(children, (child: ReactNode, i) => {
        if (React.isValidElement(child)) {
          const { hidden } = child.props;
          return React.cloneElement(child, {
            ...(child.props as any),
            index: !hidden ? (index += 1) : null,
          });
        }
        return child;
      }) || []
    );
  };

  const renderFormItem = () => {
    let offset;
    let spanSizeSum = spanSize;
    let collapsedVisible = true;
    const items = markFormItem(children).map((child: ReactNode, i) => {
      if (React.isValidElement(child)) {
        const { hidden, index } = child.props;
        if (!!hidden) {
          return React.cloneElement(child, {
            ...(child.props as any),
          });
        } else if (collapsed && index && index > showIndex - 1) {
          return React.cloneElement(child, {
            ...(child.props as any),
            hidden: true,
          });
        } else if (child !== null && child !== undefined) {
          spanSizeSum += spanSize;
          return (
            <Col span={spanSize} key={i}>
              {child}
            </Col>
          );
        }
      }
      return child;
    });
    collapsedVisible = spanSizeSum !== 24 && items?.length !== 0 && items?.length !== 1;
    const spanSizeExtra = spanSizeSum % 24;
    if (spanSizeSum < 24) {
      offset = 0;
      collapsedVisible = false;
    } else if (spanSizeExtra === 0) {
      offset = 0;
    } else if (spanSizeExtra > spanSize && spanSizeExtra % spanSize !== 0) {
      offset = 24 - (24 - spanSizeExtra);
    } else if (spanSizeExtra % spanSize === 0) {
      offset = 24 - spanSizeExtra;
    } else {
      offset = 0;
    }
    return (
      <>
        {items}
        <Col style={{ textAlign: 'right' }} span={spanSize} offset={offset}>
          <Form.Item
            wrapperCol={{
              style: {
                maxWidth: '100%',
              },
            }}
          >
            <Space size={'middle'}>
              <Space>
                <Button htmlType="reset">重置</Button>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </Space>
              {(collapsedVisible || !!collapsed) && (
                <Space>
                  <a onClick={handleClick}>
                    {collapsed ? '展开' : '收起'}
                    <DownOutlined
                      style={{
                        marginLeft: '0.5em',
                        transition: '0.3s all',
                        transform: `rotate(${collapsed ? 0 : 0.5}turn)`,
                      }}
                    />
                  </a>
                </Space>
              )}
            </Space>
          </Form.Item>
        </Col>
      </>
    );
  };

  return (
    <RcResizeObserver
      onResize={(size) => {
        setWidth(size.width);
      }}
    >
      <div>
        <Form
          {...restProps}
          ref={ref}
          labelCol={{ flex: `0 0 ${labelWidth}px` }}
          wrapperCol={{
            style: {
              maxWidth: `calc(100% - ${labelWidth}px)`,
            },
          }}
          style={{
            flexWrap: 'nowrap',
          }}
        >
          <Row gutter={24} justify="start">
            {renderFormItem()}
          </Row>
        </Form>
      </div>
    </RcResizeObserver>
  );
});
