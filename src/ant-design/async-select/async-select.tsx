import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { mergeProps } from '../../utils/with-default-props';

export const { Option } = Select;

type SelectProps = React.ComponentProps<typeof Select>;
type ActionType = 'open' | 'auto';

export interface AsyncSelectProps<T> extends SelectProps {
  trigger?: ActionType;
  request?: () => Promise<T[]>;
  onOption?: (item: T[] | undefined) => any;
}

const defaultProps = {
  trigger: 'open',
};

export const AsyncSelect = <T extends Record<string, any>>(p: AsyncSelectProps<T>) => {
  const props = mergeProps(defaultProps, p);
  const { trigger, request, onOption, children, options, ...restProps } = props;
  const [optionsData, setOptionsData] = useState<T[]>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (trigger === 'auto') {
      setLoading(true);
      request?.()
        .then((res) => {
          setOptionsData(res);
        })
        .catch(() => {
          setOptionsData([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  // TODO 逻辑重复, loading可以用自定义hook
  const onDropDown = (open: boolean) => {
    console.log(optionsData);
    if (open && trigger === 'open' && !optionsData?.length) {
      setLoading(true);
      request?.()
        .then((res) => {
          setOptionsData(res);
        })
        .catch(() => {
          setOptionsData([]);
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
    // 如果传入 options || children ，则自动降级为普通Select
    if (children || options) {
      return <Select {...restProps}>{children}</Select>;
    }
    // 不传onOptions，默认用户传入的Promise返回值符合options数据结构
    if (!onOption) {
      return (
        <Select
          open={open}
          loading={loading}
          onDropdownVisibleChange={onDropDown}
          options={optionsData}
          {...restProps}
        />
      );
    }
    return (
      <Select open={open} loading={loading} onDropdownVisibleChange={onDropDown} {...restProps}>
        {onOption(optionsData)}
      </Select>
    );
  };
  return render();
};
