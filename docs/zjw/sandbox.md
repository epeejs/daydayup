# 实现一个不能操作 DOM 的环境

## 实现一

通过 with 语句限制内部代码访问的上下文，再代理 window 对象

```js
function sandbox(code, options) {
  const { blackList, ctx } = options;
  const innerCtx = new Proxy(ctx, {
    has(target, prop) {
      if (blackList.includes(prop)) {
        throw new Error(`cant use ${prop} in sandbox`);
      }

      return Reflect.has(target, prop);
    },
  });

  return new Function('ctx', `with(ctx) { ${code} }`).call(innerCtx, innerCtx);
}

sandbox('console.log(document)', {
  blackList: ['document'],
  ctx: window,
});
```
