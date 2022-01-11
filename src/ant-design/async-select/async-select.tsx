import React, { ReactNode, useEffect, useState } from 'react';
import { Select } from 'antd';
import { mergeProps } from '../../utils/with-default-props';

export const { Option } = Select;

type DefaultOptionType = {
  label?: ReactNode;
  value?: string | number | null;
} & Record<string, any>;

type SelectProps = React.ComponentProps<typeof Select>;
type ActionType = 'open' | 'auto';

export interface AsyncSelectProps<T> extends SelectProps {
  trigger?: ActionType;
  request?: () => Promise<T[]>;
  onLabel?: (item: T) => ReactNode;
  onValue?: (item: T) => string | number | null;
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

  // TODO 逻辑重复, loading可以用自定义hook
  const onDropDown = (open: boolean) => {
    if (open && trigger === 'open' && !options.length) {
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
              key={value}
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
