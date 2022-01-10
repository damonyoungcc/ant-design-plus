import { defineConfig } from 'dumi';

const repo = 'ant-design-plus';

export default defineConfig({
  title: 'ant-design-plus',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  dynamicImport: {},
  postcssLoader: {},
  fastRefresh: {},
  alias: {
    '@yang/antd-design-plus/es': process.cwd() + 'src',
  },
  navs: [
    {
      title: '组件',
      path: '/components',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/yangdepp/ant-design-plus',
    },
  ],
  themeConfig: {
    hd: {
      rules: [],
    },
  },
});
