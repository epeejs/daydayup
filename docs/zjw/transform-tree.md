# 扁平数据结构转换成树

input

```js
let arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
];
```

output

```js
[
  {
    id: 1,
    name: '部门1',
    children: [
      { id: 2, name: '部门2', pid: 1 },
      {
        id: 3,
        name: '部门3',
        pid: 1,
        children: [
          // ...
        ],
      },
    ],
  },
];
```

## 实现一：递归

```js
function getChildren(arr, id) {
  const children = arr.filter((m) => m.pid === id);

  if (children.length) {
    return children.map((m) => ({
      ...m,
      children: getChildren(arr, m.id),
    }));
  }
  return children;
}

getChildren(arr, 0);
```

## 实现二：Map

```js
function gerenteTree(arr) {
  const map = {};
  const result = [];

  // 使用索引直接查找元素
  arr.forEach((m) => {
    map[m.id] = {
      ...m,
    };
  });

  arr.forEach((m) => {
    const { id, pid } = m;
    const item = map[id];

    if (pid === 0) {
      result.push(item);
    } else {
      // 使用同一引用避免递归
      const p = map[pid];

      if (!p) {
        return;
      }
      if (p.children) {
        p.children.push(item);
      } else {
        p.children = [item];
      }
    }
  });

  return result;
}
```

## 结论

Map 时间复杂度：O(n) 空间复杂度 O(n)

当 n 越大时采用实现二更优
