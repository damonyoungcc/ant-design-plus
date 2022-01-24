import React, { useState, ReactNode, forwardRef, useEffect } from 'react';
import type { ReactElement } from 'react';
import { Form, Row, Col, Space, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { FormProps, FormInstance } from 'antd/es/form';
import { mergeProps } from '../../utils/with-default-props';
import RcResizeObserver from 'rc-resize-observer';
import isBrowser from '../../utils/is-browser';

interface QueryFilterProps extends FormProps {
  children: ReactNode;
  form?: FormInstance;
  defaultCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  hideRequiredMark?: boolean;
  labelWidth?: number | 'auto';
  span?: number;
  split?: boolean;
}

const BREAKPOINTS = {
  default: [
    [0, 531, 1, 'vertical'],
    [531, 701, 2, 'vertical'],
    [701, 1062, 3, 'horizontal'],
    [1062, 1352, 3, 'horizontal'],
    [1352, Infinity, 4, 'horizontal'],
  ],
} as const;

const defaultProps = {
  defaultCollapsed: true,
  hideRequiredMark: true,
  labelWidth: 80,
  preserve: true,
};

const defaultWidth = isBrowser() ? document.body.clientWidth : 1024;

export const QueryFilter = forwardRef<FormInstance, QueryFilterProps>((p, ref) => {
  const props = mergeProps(defaultProps, p);
  const { onCollapse, defaultCollapsed, labelWidth, children, ...restProps } = props;

  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [width, setWidth] = useState(defaultWidth);
  const [spanSize, setSpanSize] = useState<number>();
  const [offsetSize, setOffsetSize] = useState<number>();

  const handleClick = () => {
    setCollapsed(!collapsed);
    onCollapse && onCollapse(collapsed);
  };

  const renderFormItem = () => {
    return React.Children.map(children, (child, i) => {
      return (
        child !== null &&
        child !== undefined && (
          <Col span={spanSize}>{React.cloneElement(child as ReactElement)}</Col>
        )
      );
    });
  };

  useEffect(() => {
    const { default: defaultBreakPoints } = BREAKPOINTS;
    const filterItem = defaultBreakPoints.filter((item) => {
      return width >= item[0] && width < item[1];
    });
    setSpanSize(24 / filterItem[0][2]);
  }, [width]);
  console.log(children);
  return (
    <RcResizeObserver
      onResize={(size) => {
        console.log(size);
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
            <Col style={{ textAlign: 'right' }} span={spanSize} offset={offsetSize}>
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
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </RcResizeObserver>
  );
});
