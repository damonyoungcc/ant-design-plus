import React from 'react';
import { Select } from 'antd';

type SelectProps = React.ComponentProps<typeof Select>;
type FetchMode = 'trigger' | 'auto';

export interface AsyncSelectProps extends SelectProps {
  asyncType?: FetchMode;
}

export const AsyncSelect = (props: AsyncSelectProps) => {
  const { asyncType, children, ...restProps } = props;
  return <Select {...restProps}>{children}</Select>;
};
