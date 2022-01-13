import React, { ReactNode, useEffect, useState } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';
import { mergeProps } from '../../utils/with-default-props';

export const { Option } = Select;

type ActionType = 'open' | 'auto';

export interface AsyncSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
  trigger?: ActionType;
  request: () => Promise<ValueType[]>;
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
  const { trigger, request, ...restProps } = props;
  const [options, setOptions] = useState<ValueType[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (trigger === 'auto') {
      setLoading(true);
      request?.().then((res) => {
        setOptions(res);
      });
      setLoading(false);
    }
  }, []);

  // TODO 逻辑重复, loading可以用自定义hook
  const onDropDown = (open: boolean) => {
    if (open && trigger === 'open' && !options.length) {
      setLoading(true);
      request?.().then((res) => {
        setOptions(res);
      });
      setOpen(open);
    } else {
      setOpen(open);
    }
  };

  const render = () => {
    return (
      <Select<ValueType>
        open={open}
        loading={loading}
        onDropdownVisibleChange={onDropDown}
        options={options}
        {...restProps}
      />
    );
  };
  return render();
};
