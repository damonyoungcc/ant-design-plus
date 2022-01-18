---
group:
  title: 'ant-design'
  path: '/ant-design'
  order: 2
nav:
  title: 组件
  path: /components
order: 2
title: 'QueryFilter 筛选表单'
mobile: false
---

## QueryFilter 筛选表单

### 何时使用

- 一般配合`Table` 和 `List`使用，放置在 `Table` 上方筛选
- `QueryFilter` 解决了复杂的样式的设置

### 基础用法

<code src="./demos/demo1.tsx" />

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| collapsed | 是否折叠超出的表单项，用于受控模式 | boolean |  |
| defaultCollapsed | 切换表单折叠状态时的回调 | boolean | true |
| onCollapse | 自定义`Option`的展示 | (collapsed)=>void | - |
| hideRequiredMark | 隐藏所有表单项的必选标记，默认隐藏 | boolean | true |
| labelWidth | `label` 宽度 | `number` \| `'auto'` | 80 |
| span | 表单项宽度 | number[0 - 24] | - |
| split | 每一行是否有分割线 | boolean | - |
| preserve | 是否能够查询收起的数据，如果设置为 true，收起后的表单数据将会丢失 | boolean | true |
