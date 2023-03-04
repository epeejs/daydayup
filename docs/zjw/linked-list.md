# 链表

## 构建

```js
function ListNode(val) {
  this.val = val;
  this.next = null;
}

// 实现一：遍历
function build(nums) {
  var dummy = new ListNode();
  var p = dummy;

  for (let i = 0; i < nums.length; i++) {
    var node = new ListNode(nums[i]);
    p.next = node;
    p = node;
  }

  return dummy.next;
}

console.log(build([1, 2, 3]));

// 实现二：递归
function build(nums, start) {
  if (start > nums.length - 1) {
    return null;
  }
  var node = new ListNode(nums[start]);
  node.next = build(nums, start + 1);

  return node;
}

console.log(build([1, 2, 3]), 0);
```

## 反转

```js
// 实现一：遍历
function reverse(head) {
  var pre = null,
    cur = head;

  while (cur) {
    var next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
}

// 实现二：递归
function reverse(head) {
  if (head === null || head.next === null) {
    return head;
  }

  var last = reverse(head.next);
  head.next.next = head;
  head.next = null;
  return last;
}
```

## 反转 m 到 n 之间元素

输入：head = [1,2,3,4,5], left = 2, right = 4  
输出：[1,4,3,2,5]

```js
var reverseBetween = function (head, left, right) {
  if (left === 1) {
    return reverseN(head, right);
  }

  head.next = reverseBetween(head.next, left - 1, right - 1);
  return head;
};

var successor = null;

function reverseN(head, n) {
  if (n === 1) {
    successor = head.next;
    return head;
  }

  var last = reverseN(head.next, n - 1);
  head.next.next = head;
  head.next = successor;

  return last;
}
```

## 双向链表

```js
class Node {
  prev = null;
  next = null;

  constructor(val) {
    this.val = val;
  }
}

class DoubleLinkedList {
  size = 0;

  constructor() {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  // 向队尾添加节点
  addLast(node) {
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev.next = node;
    this.tail.prev = node;
    this.size++;
  }
  // 移除节点
  remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.size--;
  }
  // 移除队头
  removeFirst() {
    if (this.head.next === this.tail) {
      return null;
    }
    const first = this.head.next;
    this.remove(first);
    return first;
  }
}
```
