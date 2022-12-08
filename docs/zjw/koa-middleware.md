# 实现 koa 中间件

koa 中间件具备以下特点

- 每个中间件接受 next 函数，控制继续向下个中间件执行
- next(error) 调用时，抛出异常，中断调用栈
- await next() 前代码按中间件正序运行，后面代码按逆序运行（即洋葱模型）

例如，实现 run 函数，输出以下结果

```ts
run(() => {
  console.log('run task');
  return Promise.resolve(1);
}, [
  (next) => {
    console.log('1 entry');
    await next();
    console.log('1 leave');
  },
  (next) => {
    console.log('2 entry');
    await next();
    console.log('2 leave');
  },
]);

// 1 entry
// 2 entry
// run task
// 2 leave
// 1 leave
```

## 使用 async await 实现

逆序遍历中间件列表，层层包裹 task 实现

```ts
function run(task, middlewares: any[]) {
  const composeTask = middlewares.reverse().reduce((prev, curr) => {
    return async () => {
      await curr(prev);
    };
  }, task);

  return composeTask();
}
```

实现 next(error) 调用抛出异常

```ts
function run(task, middlewares: any[]) {
  // 包裹 task 接收 error 参数抛出
  const composeTask = [...middlewares, task].reverse().reduce((prev, curr) => {
    return async (error) => {
      if (error) {
        throw error;
      }
      await curr(prev);
    };
    // 省略第二个参数，会从第二个元素开始遍历
  }, undefined);

  return composeTask();
}
```

如果其中一个中间件不使用 await 方式调用 next 会出现以下输出

```ts
run(() => {
  console.log('run task');
  return Promise.resolve(1);
}, [
  (next) => {
    console.log('1 entry');
    next();
    console.log('1 leave');
  },
  (next) => {
    console.log('2 entry');
    await next();
    console.log('2 leave');
  },
]);

// 1 entry
// 2 entry
// run task
// 1 leave
// 2 leave
```

可以发现，entry 代码是按正确循序执行，但是 leave 代码，由于第二个中间件 await next() 后面代码添加成微任务，退出第一个中间件 next 调用，执行接下来语句，所以先输出 “1 leave”，再执行微任务，输出 “2 leave”
