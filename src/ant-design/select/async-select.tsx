/**
 * 传入一个Promise，在组件内部进行请求
 * 用户也可以不传，当普通Select使用
 * 可以定制用户的label 和 value 和 option
 * 触发时机有click 和 自动，默认click
 */
import React, { ReactNode, useEffect, useState } from 'react';
import { Select } from 'antd';
import { mergeProps } from '../../utils/with-default-props';

export const { Option } = Select;

type DefaultOptionType = {
  label?: ReactNode;
  value?: string;
};

type SelectProps = React.ComponentProps<typeof Select>;
type ActionType = 'open' | 'auto';

export type RequestData<T> = {
  data: T[] | undefined;
} & Record<string, any>;

export interface AsyncSelectProps<T> extends SelectProps {
  trigger?: ActionType;
  request?: () => Promise<T[]>;
  onLabel?: (item: T) => ReactNode;
  onValue?: (item: T) => string;
  onOption?: (item: T) => ReactNode;
}

const defaultProps = {
  trigger: 'open',
};

export const AsyncSelect = <T extends DefaultOptionType>(p: AsyncSelectProps<T>) => {
  const props = mergeProps(defaultProps, p);
  const {
    trigger,
    request,
    onLabel,
    onValue,
    onOption,
    onDropdownVisibleChange,
    onBlur,
    ...restProps
  } = props;
  const [options, setOptions] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (trigger === 'auto') {
      setLoading(true);
      request?.()
        .then((res) => {
          setOptions(res);
        })
        .catch(() => {
          setOptions([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const onDropDown = (open: boolean) => {
    if (open && trigger === 'open') {
      console.log('111');
      setLoading(true);
      request?.()
        .then((res) => {
          setOptions(res);
        })
        .catch(() => {
          setOptions([]);
        })
        .finally(() => {
          setOpen(open);
          setLoading(false);
        });
    } else {
      setOpen(open);
    }
  };

  const render = (asyncOptions: T[]) => {
    const { children, options } = props;
    // 如果传入 options || children ，则自动降级为普通Select
    if (children || options) {
      return <Select {...restProps}>{children}</Select>;
    }
    return (
      <Select open={open} loading={loading} onDropdownVisibleChange={onDropDown} {...restProps}>
        {asyncOptions.map((item, index) => {
          const { label, value } = item;
          return (
            <Option
              key={index}
              value={onValue ? onValue(item) : value}
              label={onLabel ? onLabel(item) : label}
            >
              {onOption ? onOption(item) : label}
            </Option>
          );
        })}
      </Select>
    );
  };
  return render(options);
};
