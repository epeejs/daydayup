# 从模块编译结果学习 (0,fn)() 用法

例如下面示例代码

```js [hello.js]
export function say(name) {
  return `hello ${name}`;
}
```

```js [index.js]
import { say } from './hello.js';
say('world');
```

当我们使用 babel 编译后，出现如下结果

```js [index.js]
var _hello = require('./hello.js');
(0, _hello.say)('world');
```

为什么需要 (0,fn)() 这种形式调用

其实 (0,fn)() 等同于 0 ? 0:fn() 或者 0&&fn()  
最终还是为了调用 fn 函数，为什么不直接调用

## 从例子分析

```js
// a.js
const moduleA = {
  name: 1,
  say() {
    console.log(this.name);
  },
};

// b.js
// 输出 1
moduleA.say();
// undefined
(0, moduleA.say)();
```

这样调用后，等于函数 `say` 在 b 模块上下文下执行，从而保证执行上下文的正确
