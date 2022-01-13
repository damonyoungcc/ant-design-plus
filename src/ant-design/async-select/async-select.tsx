import React, { ReactNode, useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import { SelectProps } from 'antd/es/select';
import { mergeProps } from '../../utils/with-default-props';

export const { Option } = Select;

type ActionType = 'auto' | 'open' | 'down';

export interface AsyncSelectProps<ValueType = any> extends Omit<SelectProps<ValueType>, 'options'> {
  trigger?: ActionType;
  request?: () => Promise<ValueType[]>;
  customOption?: (option: ValueType, index: number, options: ValueType[]) => ReactNode;
}

interface DefaultValueType {
  key?: string;
  disabled?: boolean;
  label: ReactNode;
  value: string | number;
}

const defaultProps = {
  trigger: 'open',
};

export const AsyncSelect = <ValueType extends DefaultValueType = any>(p: AsyncSelectProps) => {
  const props = mergeProps(defaultProps, p);
  const { trigger, request, customOption, children, ...restProps } = props;

  const [options, setOptions] = useState<ValueType[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (trigger === 'auto') {
      setLoading(true);
      request?.()
        .then((res) => {
          setOptions(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  // TODO 逻辑重复, loading可以用自定义hook
  const onDropDown = (open: boolean) => {
    if (trigger === 'down') {
      setOpen(open);
    }
    if (open && trigger != 'auto' && !options.length) {
      setLoading(true);
      request?.()
        .then((res) => {
          setOptions(res);
        })
        .finally(() => {
          setOpen(open);
          setLoading(false);
        });
    } else {
      setOpen(open);
    }
  };

  const render = () => {
    //  if have children props auto relegation antd Seleect
    if (children) {
      return <Select<ValueType> {...restProps}>{children}</Select>;
    }

    // no props customOption means use options render data
    if (!customOption) {
      return (
        <Select<ValueType>
          open={open}
          loading={trigger !== 'down' ? loading : undefined}
          onDropdownVisibleChange={onDropDown}
          options={options}
          notFoundContent={loading ? <Spin size="small" /> : null}
          {...restProps}
        />
      );
    }

    // custom option
    return (
      <Select<ValueType>
        open={open}
        loading={trigger !== 'down' ? loading : undefined}
        notFoundContent={loading ? <Spin size="small" /> : null}
        onDropdownVisibleChange={onDropDown}
        {...restProps}
      >
        {options.map((item, index) => {
          return customOption(item, index, options);
        })}
      </Select>
    );
  };
  return render();
};
