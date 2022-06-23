import mergeProps from './with-default-props';

const defaultProps = {
  delay: 1000,
  responseData: [
    {
      key: '1',
      path: '/welcome',
      name: '欢迎',
      icon: 'smile',
    },
    {
      key: '2',
      path: '/admin',
      name: '管理页',
      icon: 'crown',
      children: [
        {
          key: '2-1',
          path: '/admin/sub-page1',
          name: '一级页面',
        },
        {
          key: '2-2',
          path: '/admin/sub-page2',
          name: '二级页面',
        },
        {
          key: '2-3',
          path: '/admin/sub-page3',
          name: '三级页面',
        },
      ],
    },
    {
      key: '3',
      path: '/list',
      name: '列表页',
      icon: 'tablet',
      children: [
        {
          key: '3-1',
          path: '/list/sub-page1',
          name: '一级列表页面',
          children: [
            {
              key: '3-1-1',
              path: '/list',
              name: '一一级列表页',
            },
            {
              key: '3-1-2',
              path: '/list',
              name: '一二级列表页',
            },
            {
              key: '3-1-3',
              path: '/list',
              name: '一三级列表页',
            },
          ],
        },
        {
          key: '3-2',
          path: '/list/sub-page2',
          name: '二级列表页面',
        },
        {
          key: '3-3',
          path: '/list/sub-page3',
          name: '三级列表页面',
        },
      ],
    },
    {
      key: '4',
      icon: 'antd',
      path: 'https://ant.design',
      name: 'Ant Design 官网外链',
    },
  ],
  responseType: 'success',
};

const mockMenuFetchData = (props) => {
  const { delay, responseData, responseType } = mergeProps(defaultProps, props);
  console.log('数据请求中...');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (responseType === 'fail') {
        reject(new Error('请求错误'));
      }
      if (responseType === 'success') {
        resolve({
          data: responseData,
        });
      }
      console.log('数据请求结束...');
    }, delay);
  });
};

export default mockMenuFetchData;
