---
group:
  title: 'ant-design'
  path: '/ant-design'
  order: 2
nav:
  title: 组件
  path: /components
order: 3
title: 'QueryFilter 筛选表单'
mobile: false
---

## QueryFilter 筛选表单

### 何时使用

- 一般配合`Table`使用，放置在 `Table` 上方做筛选
- `QueryFilter` 完全继承了`antd`中的[Form](https://ant-design.gitee.io/components/form-cn/)组件的属性，在此基础上做了相应的拓展和封装，避免了复杂的样式设置，只填入相应的`Form.Item`业务字段，即可快速根据容器宽度完成样式布局

### 查询筛选

<code src="./demos/demo1.tsx" />

### 查询筛选-自动换行

表单项过多时，会自动换行，并显示收起按钮

<code src="./demos/demo2.tsx" />

### 查询筛选-隐藏表单项

常用于一些不方便展示的表单项并为其设置筛选默认值的场景

<code src="./demos/demo3.tsx" />

### 查询筛选-表单项联动

- 需要使用`Form`实例时，需要需要手动传入`Form`实例，`class`组件需要传入`Form`的`ref`对象
- 在函数组件中使用`QueryFilter`时，可以使用`useWatch`在最外层监听某个表单项的变化，实现表单项联动及相应的显示隐藏。

<code src="./demos/demo4.tsx" />

### 查询筛选-`class`组件用法

- 由于组件的显示和隐藏使用的是`Form.Item`的`hidden`属性，因此想要在`class`组件中使用 `noStyle` & `shouldUpdate`嵌套`Form.Item`实现表单项联动及相应的显示隐藏不可行
- 下面例子中`gender`的值，可以决定`hobby`字段是否有必填校验

<code src="./demos/demo5.tsx" />

### API

| 属性       | 说明             | 类型                       | 默认值 |
| ---------- | ---------------- | -------------------------- | ------ |
| onCollapse | 展开收起时的回调 | (collapsed: boolean)=>void | -      |
| labelWidth | `label` 宽度     | `number` \| `'auto'`       | 80     |
