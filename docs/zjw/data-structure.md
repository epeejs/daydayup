# 数据结构

## 优先队列

::: code-group

```js [从下标1开始]
class PriorityQueue {
  size = 0;
  pq = [];

  constructor(compareFn) {
    this.compareFn = compareFn;
  }

  // 上浮
  swim(x) {
    // 小堆：当x小，上浮（a-b>0），反之
    while (x > 1 && this.compare(this.parent(x), x)) {
      this.swap(x, this.parent(x));
      x = this.parent(x);
    }
  }
  // 下沉
  sink(x) {
    while (this.left(x) <= this.size) {
      var cur = this.left(x);

      if (this.right(x) <= this.size && this.compare(cur, this.right(x))) {
        cur = this.right(x);
      }
      if (this.compare(cur, x)) break;
      this.swap(cur, x);
      x = cur;
    }
  }
  // 插入堆底
  add(e) {
    this.size++;
    this.pq[this.size] = e;
    this.swim(this.size);
  }
  // 移除堆顶
  poll() {
    var cur = this.pq[1];
    this.swap(1, this.size);
    this.pq.pop();
    this.size--;
    this.sink(1);
    return cur;
  }
  // 获取堆顶元素
  peek() {
    return this.pq[1];
  }
  swap(i, j) {
    var temp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = temp;
  }
  compare(i, j) {
    if (this.compareFn) {
      return this.compareFn(this.pq[i], this.pq[j]) > 0;
    }
    return this.pq[i] - this.pq[j] > 0;
  }
  left(x) {
    return x * 2;
  }
  right(x) {
    return x * 2 + 1;
  }
  parent(x) {
    return Math.floor(x / 2);
  }
  isEmpty() {
    return !this.size;
  }
}
// 大堆
var pq = new PriorityQueue((a, b) => b - a);
[1, 2, 3, 4, 5, 6].forEach((e) => pq.add(e));
console.log(pq.pq);
```

```js {11,34,39,48,63,67,71} [从下标0开始]
class PriorityQueue {
  size = 0;
  pq = [];

  constructor(compareFn) {
    this.compareFn = compareFn;
  }

  // 上浮
  swim(x) {
    // 改动处：x>1
    while (x > 0 && this.compare(this.parent(x), x)) {
      this.swap(x, this.parent(x));
      x = this.parent(x);
    }
  }
  // 下沉
  sink(x) {
    while (this.left(x) <= this.size) {
      var cur = this.left(x);

      if (this.right(x) <= this.size && this.compare(cur, this.right(x))) {
        cur = this.right(x);
      }
      if (this.compare(cur, x)) break;
      this.swap(cur, x);
      x = cur;
    }
  }
  // 插入堆底
  add(e) {
    this.pq[this.size] = e;
    this.swim(this.size);
    // 改动处：后加
    this.size++;
  }
  // 移除堆顶
  poll() {
    // 改动处：this.pq[1]
    var cur = this.pq[0];
    this.swap(0, this.size);
    this.pq.pop();
    this.size--;
    this.sink(0);
    return cur;
  }
  peek() {
    // 改动处：this.pq[1]
    return this.pq[0];
  }
  swap(i, j) {
    var temp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = temp;
  }
  compare(i, j) {
    if (this.compareFn) {
      return this.compareFn(this.pq[i], this.pq[j]) > 0;
    }
    return this.pq[i] - this.pq[j] > 0;
  }
  left(x) {
    // 改动处：x*2
    return x * 2 + 1;
  }
  right(x) {
    // 改动处：x*2+1
    return x * 2 + 2;
  }
  parent(x) {
    // 改动处：x/2
    return Math.floor(x - 1 / 2);
  }
  isEmpty() {
    return !this.pq.length;
  }
}
```

:::

优点：自排序，时间复杂度 O(log n)
缺点：出队顺序按照元素大小，无法按先进先出顺序

## 单调队列

```js
class MonotonicQueue {
  maxq = [];

  pop(n) {
    // 如果出队不是最大元素，可能被压扁，则不用出队
    if (this.maxq[0] === n) {
      this.maxq.shift();
    }
  }
  push(n) {
    // 压扁中间元素，找到合适位置
    while (this.maxq.length && this.maxq[this.maxq.length - 1] < n) {
      this.maxq.pop();
    }
    this.maxq.push(n);
  }
  max() {
    return this.maxq[0];
  }
}
```

优点：单调递增或递减，时间复杂度 O(1)，可以按先进先出顺序
缺点：不能获取完整数据（由于删除中间元素）
