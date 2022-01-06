import React, { useState } from 'react';
import { Picker, Button } from 'antd-mobile';
const basicColumns = [
  [
    { label: '周一', value: 'Mon' },
    { label: '周二', value: 'Tues' },
    { label: '周三', value: 'Wed' },
    { label: '周四', value: 'Thur' },
    { label: '周五', value: 'Fri' },
  ],
  [
    { label: '上午', value: 'am' },
    { label: '下午', value: 'pm' },
  ],
];
export default ({ title }: { title: string }) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<(string | null)[]>(['M']);
  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        {title}
      </Button>
      <Picker
        columns={basicColumns}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        value={value}
        onConfirm={(v) => {
          setValue(v);
        }}
      />
    </>
  );
};
