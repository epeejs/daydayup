# webpack 总览

loader 用于转换某些类型的模块，插件则用于扩展 webpack 功能，通过注入钩子参与构建流程

## 构建流程

1. 初始化参数
2. 通过参数初始化 Compiler 对象，加载所有配置的插件，执行 run 方法开始编译
3. 根据 entry 递归找到所有依赖，并根据文件类型，使用配置 loader 处理文件
4. 完成所有模块转换后，构建依赖图
5. 根据依赖图组装成一个个包含多模块的 chunk，再把 chunk 加入输出列表（插件最后修改输出内容时机）
6. 根据配置确定输出内容的路径与文件名，写入文件系统

## 打包速度优化（简言之：减少打包量、并行、缓存、预构建）

- 缩小处理文件
  - resolve.alias：直接指定打包好的代码（仅开发）
  - 优化 loader 配置：开启缓存、include 减少匹配文件
  - 减少文件匹配路径：resolve 匹配规则
  - 优化解析规则：module.noParse 指定不使用模块化解析文件
  - 按需加载
  - [懒编译](https://webpack.docschina.org/configuration/experiments/#experimentslazycompilation)
- 并行打包
- [构建缓存](https://webpack.docschina.org/configuration/cache/)
- 模块联邦

## webpack HRM 原理

webpack-dev-server 向网页注入用于连接开发服务的客户端代码，在代码变更时编译出新的补丁文件，发送到网页执行

当模块变更后，更新事件会向上传递，直到某层接受了当前变化的模块，就会调用 callback 去执行自定义逻辑。当上抛到最外层没有被接受，就会刷新整个网页

```js
if (module.hot) {
  module.hot.accept(['./App'], () => {
    render(<App />, window.document.getElementById('app'));
  });
}
```

## Scope Hoisting（作用域提升）

合并 ES6 模块导入，且只被引用一次

好处：代码体积更小；内存开销减少，通过减少作用域创建函数

## Compiler 和 Compilation

compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 compilation 只是代表了一次新的编译，由 compiler 每次构建创建

compilation 包含了当前的模块资源、编译生成资源、变化的文件等

## loader 用法

```js
{
  // 用正则去匹配要用该 loader 转换的 CSS 文件
  test: /\.css$/,
  use: ['style-loader', 'css-loader?minimize']
}
```

- use 属性由 loader 名称组成的数组，loader 从后往前执行
- 每个 loader 可以通过 URL querystring 方式传入参数，也可以通过对象形式传入 `{ loader: 'css-loader', options: { minimize: true } }`
- 内联方式使用 loader，`import '!style-loader!css-loader?minimize!./styles.css'`
