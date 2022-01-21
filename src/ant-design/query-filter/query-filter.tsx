import React, { useState, ReactNode, forwardRef } from 'react';
import type { ReactElement } from 'react';
import { Form, Row, Col, Space, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { FormProps, FormInstance } from 'antd/es/form';
import { mergeProps } from '../../utils/with-default-props';
import RcResizeObserver from 'rc-resize-observer';

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

const CONFIG_SPAN_BREAKPOINTS = {
  xs: 513,
  sm: 513,
  md: 785,
  lg: 992,
  xl: 1057,
  xxl: Infinity,
};

const BREAKPOINTS = {
  default: [
    [513, 1, 'vertical'],
    [701, 2, 'vertical'],
    [1062, 3, 'horizontal'],
    [1352, 3, 'horizontal'],
    [Infinity, 4, 'horizontal'],
  ],
};

const defaultProps = {
  defaultCollapsed: true,
  hideRequiredMark: true,
  labelWidth: 80,
  preserve: true,
};

export const QueryFilter = forwardRef<FormInstance, QueryFilterProps>((p, ref) => {
  const props = mergeProps(defaultProps, p);
  const { onCollapse, defaultCollapsed, labelWidth, children, ...restProps } = props;

  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const handleClick = () => {
    setCollapsed(!collapsed);
    onCollapse && onCollapse(collapsed);
  };

  const renderFormItem = () => {
    return React.Children.map(children, (child, i) => {
      return <Col span={8}>{React.cloneElement(child as ReactElement)}</Col>;
    });
  };

  return (
    <RcResizeObserver
      onResize={(size) => {
        console.log(size);
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
            <Col style={{ textAlign: 'right' }} span={8}>
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
