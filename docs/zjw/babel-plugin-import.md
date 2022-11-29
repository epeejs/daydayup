# 实现导入转换 babel 插件

转换 antd 导入为按需加载，例如

```js
import { Button } from 'antd'

⬇️    ⬇️     ⬇️
import Button from 'antd/es/button'
import 'antd/es/button/style'
```

## babel 运行过程

输出 code -> ast (@babel/parser) -> 转换 (应用插件修改 ast) -> 生成代码 (@babel/generator)

## babel 插件顺序

- 插件在预设之前运行
- 插件按定义循序执行
- 预设从后往前执行

## 插件基本结构

```js
export default function (babel) {
  return {
    // pre(state) {},
    visitor: {},
    // post(state) {},
  };
}
```

插件执行时，pre -> visitor -> post

插件分为两类：

- 语法插件
- 转换插件

其中语法插件则是启用 @babel/parser 内部支持语法，例如支持解析 jsx 插件

[babel-plugin-syntax-jsx](https://github.com/babel/babel/blob/main/packages/babel-plugin-syntax-jsx/src/index.ts) 源码

```ts
import { declare } from '@babel/helper-plugin-utils';

export default declare((api) => {
  api.assertVersion(7);

  return {
    name: 'syntax-jsx',

    manipulateOptions(opts, parserOpts) {
      const { plugins } = parserOpts;
      // 如果包含 typescript 插件，则使用其解析 jsx，所以直接返回
      if (plugins.some((p) => (Array.isArray(p) ? p[0] : p) === 'typescript')) {
        return;
      }

      // 启用 jsx 语法解析，否则 @babel/praser 会报错
      plugins.push('jsx');
    },
  };
});
```

## 实现

```ts
import * as Babel from '@babel/core';

export default function (babel: typeof Babel): Babel.PluginObj {
  const { types: t } = babel;

  return {
    name: 'babel-plugin-import',
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source?.value === 'antd') {
          const vars = path.node.specifiers.map((m) => m.local.name);

          path.replaceWithMultiple(
            vars
              .map((m) => [
                t.importDeclaration(
                  [t.importDefaultSpecifier(t.identifier(m))],
                  t.stringLiteral(`antd/es/${m.toLowerCase()}`),
                ),
                t.importDeclaration([], t.stringLiteral(`antd/es/${m.toLowerCase()}/style`)),
              ])
              .flat(),
          );
        }
      },
    },
  };
}
```

使用

```json
{
  "plugins": ["./babel-plugin-import"]
}
```

## 插件选项

支持库目录指定

```diff
+      ImportDeclaration(path, state) {
         if (path.node.source?.value === 'antd') {
+          const { libraryDirectory = 'es' } = state.opts;

           path.replaceWithMultiple(
             vars
               .map((m) => [
                 t.importDeclaration(
                   [t.importDefaultSpecifier(t.identifier(m))],
+                  t.stringLiteral(`antd/${libraryDirectory}/${m.toLowerCase()}`),
                 ),
                 t.importDeclaration(
                   [],
+                  t.stringLiteral(`antd/${libraryDirectory}/${m.toLowerCase()}/style`),
                 ),
               ])
               .flat(),
           );
         }
       },
```

使用

```json
{
  "plugins": [["./babel-plugin-import", { "libraryDirectory": "lib" }]]
}
```

## 遇到的问题

- @babel/cli 默认只编译 js 文件，会忽略 ts 文件，需要设置 `--extensions '.ts'` 与 `"presets": ["@babel/preset-typescript"]`（.babelrc）
- ts 文件下应用插件不生效，由于 @babel/preset-typescript `onlyRemoveTypeImports` 选项默认值为 `false` 移除未使用的导入，可以设置为 `true` 仅移除类型导入，或者使用导入变量，例如

```diff
import { Button, Card } from 'antd';

+ console.log(Button, Card)
```

## 相关资源

- [AST Explorer](https://astexplorer.net) -- 在线 ast 生成
- [babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
