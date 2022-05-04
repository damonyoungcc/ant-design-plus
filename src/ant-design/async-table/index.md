---
group:
  title: 'ant-design'
  path: '/ant-design'
  order: 2
nav:
  title: 组件
  path: /components
order: 4
title: 'AsyncTable 异步表格'
mobile: false
---

## AsyncTable 异步表格

### 何时使用

- 对`Table`的分页和筛选做封装

### 基础用法

<code src="./demos/demo1.tsx" />

### API

`QueryFilter` 筛选表单完全继承了[antd Form](https://ant-design.gitee.io/components/form-cn/#API) 组件的`API`

| 属性       | 说明             | 类型                         | 默认值 |
| ---------- | ---------------- | ---------------------------- | ------ |
| onCollapse | 展开收起时的回调 | `(collapsed: boolean)=>void` | -      |
| labelWidth | `label` 宽度     | `number`                     | `80`   |
