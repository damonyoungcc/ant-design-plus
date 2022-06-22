---
group:
  title: 'ant-design'
  path: '/ant-design'
  order: 2
nav:
  title: 组件
  path: /components
order: 1
title: 'Layout 布局'
mobile: false
---

## Layout 布局

### 何时使用

- 异步获取菜单后，自动布局。

### 基础用法

默认异步返回的数据结构为 `{label: ReactNode; value: string}`

<code src="./demos/demo1.js" />

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| request | 获取选择器下拉菜单数据的方法 | `() => Promise<ValueType[] \| undefined>` | - |
| customOption | 自定义`Option`的展示 | `(option: ValueType, index: number, options: ValueType[]) => ReactNode` | - |
| customLoading | 自定义加载样式 | `ReactNode` | - |
