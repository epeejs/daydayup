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
```
