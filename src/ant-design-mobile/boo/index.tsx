import React, { useState } from 'react';
import { Button, Picker, Space } from 'antd-mobile';
import { AntOutline } from 'antd-mobile-icons';
import './index.less';

const season = [
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];

export default ({ title }: { title: string }) => {
  const [visible, setVisible] = useState(false);

  return (
    <h1>
      <Space align="end">
        <Button
          onClick={() => {
            setVisible(true);
          }}
        >
          点击
        </Button>
        <AntOutline className="adm-test-less" />
        <Button
          color={'primary'}
          style={{
            color: 'var(--adm-color-warning)',
            fontSize: 14,
          }}
        >
          {title}
        </Button>
      </Space>
      <Picker visible={visible} columns={season} onClose={() => setVisible(false)} />
    </h1>
  );
};
