/**
 * @type {import('vitepress').UserConfig}
 */
export default {
  title: 'daydayup',
  description: '学习记录',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    outlineTitle: '大纲',
    socialLinks: [{ icon: 'github', link: 'https://github.com/epeejs/daydayup' }],
    sidebar: [
      {
        items: [
          { text: '链表', link: '/zjw/linked-list' },
          { text: '二叉树', link: '/zjw/binary-tree' },
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
        ],
      },
    ],
  },
};
