import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'daydayup',
  description: '学习记录',
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.svg',
    outlineTitle: '大纲',
    socialLinks: [{ icon: 'github', link: 'https://github.com/epeejs/daydayup' }],
    sidebar: [
      {
        text: '数据结构与算法',
        items: [
          { text: '链表', link: '/zjw/linked-list' },
          { text: '二叉树', link: '/zjw/binary-tree' },
          { text: '数据结构', link: '/zjw/data-structure' },
          { text: '排序算法', link: '/zjw/sort' },
        ],
      },
      {
        text: '笔记',
        items: [
          { text: '前端自动化测试', link: '/zjw/auto-test' },
          { text: '扁平数据结构转换成树', link: '/zjw/transform-tree' },
          {
            text: '前端常见手写代码',
            link: '/zjw/前端常见手写代码',
          },
          {
            text: '实现导入转换 babel 插件',
            link: '/zjw/babel-plugin-import',
          },
          {
            text: '解决 Taro 页面无法异步渲染问题',
            link: '/zjw/babel-plugin-taro-page-hoc',
          },
          {
            text: '实现 koa 中间件',
            link: '/zjw/koa-middleware',
          },
          {
            text: '沙盒',
            link: '/zjw/sandbox',
          },
          {
            text: '从模块编译结果学习(0,fn)()用法',
            link: '/zjw/(0,fn)().md',
          },
          {
            text: 'react-router 实现',
            link: '/zjw/react-router.md',
          },
        ],
      },
    ],
    algolia: {
      appId: 'U1Z6ZWPG5H',
      apiKey: '74d24b181698cc5eb4fb9d10c4d7c1c8',
      indexName: 'daydayup',
    },
  },
  base: '/daydayup/',
  lang: 'zh-cn',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/daydayup/logo.svg' }]],
});
