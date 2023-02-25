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
function getChildren(arr, id, result = []) {
  arr.forEach((m) => {
    if (m.pid === id) {
      result.push({
        ...m,
        children: getChildren(arr, m.id),
      });
    }
  });

  return result;
}
```

## 实现二：Map

```js
function gerenteTree(arr) {
  const map = {};
  const result = [];

  arr.forEach((m) => {
    const { id, pid } = m;
    const item = {
      ...m,
      children: map[id] ? map[id].children : [],
    };

    map[id] = item;

    if (pid === 0) {
      result.push(item);
    } else {
      if (!map[pid]) {
        map[pid] = {
          children: [],
        };
      }
      map[pid].children.push(item);
    }
  });

  return result;
}
```

## 结论

- 递归时间复杂度：O(n logk n) 最坏情况下（k=1）等于 n^2，空间复杂度 O(n)
- Map 时间复杂度：O(n) 空间复杂度 O(n)

当 n 越大时采用实现二更优
