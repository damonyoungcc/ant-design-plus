import React, { ReactNode, useState } from 'react';
import { Select, Spin } from 'antd';
import { SelectProps } from 'antd/es/select';

import { mergeProps } from '../../utils/with-default-props';
import { useRequest } from './use-request';

export const { Option } = Select;

export type ActionType = 'auto' | 'open';
export interface AsyncSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
  trigger?: ActionType;
  request: () => Promise<ValueType[] | undefined>;
  customOption?: (option: ValueType, index: number, options: ValueType[]) => ReactNode;
  customLoading?: ReactNode;
}

export interface DefaultValueType {
  key?: string;
  disabled?: boolean;
  label: ReactNode;
  value: string | number;
}

const defaultProps = {
  trigger: 'open',
  customLoading: <Spin size="small" />,
};

export const AsyncSelect = <ValueType extends DefaultValueType = any>(p: AsyncSelectProps) => {
  const props = mergeProps(defaultProps, p);
  const {
    trigger,
    request,
    customOption,
    customLoading,
    open: o,
    onDropdownVisibleChange,
    ...restProps
  } = props;

  const [open, setOpen] = useState(o);
  const { data: options = [], loading, run } = useRequest<ValueType>(request, trigger);

  const onDropdown = (open: boolean) => {
    setOpen(open);
    if (open && !options.length) {
      run();
    }
    onDropdownVisibleChange && onDropdownVisibleChange(open);
  };

  const render = () => {
    // no props customOption means use options render data
    if (!customOption) {
      return (
        <Select<ValueType>
          open={open}
          onDropdownVisibleChange={onDropdown}
          options={options}
          notFoundContent={loading ? customLoading : undefined}
          {...restProps}
        />
      );
    }

    // custom option
    return (
      <Select<ValueType>
        open={open}
        onDropdownVisibleChange={onDropdown}
        notFoundContent={loading ? customLoading : undefined}
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
