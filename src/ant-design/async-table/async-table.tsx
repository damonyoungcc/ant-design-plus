import React from 'react';
import { Table } from 'antd';

export interface AsyncTableProps extends React.ComponentProps<typeof Table> {
  request?: () => Promise<any[] | undefined>;
}

export const AsyncTable = (props: AsyncTableProps) => {
  const { request, ...rest } = props;

  return <Table {...rest} />;
};
