## 完全二叉树层序遍历还原

![tree.jpg](https://assets.leetcode.com/uploads/2021/02/19/tree.jpg)

补充成完全二叉树的层序遍历结果：[3,9,20,null,null,15,7]

### 代码实现

```js
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

function build(levelOrder) {
  var p = 0;
  var track = [];
  var res = new TreeNode(levelOrder[p]);

  track.push(res);

  while (p < levelOrder.length - 1) {
    var n = track.length;

    for (var i = 0; i < n; i++) {
      var node = track.shift();

      if (node) {
        node.left = levelOrder[p + 1] ? new TreeNode(levelOrder[p + 1]) : null;
        node.right = levelOrder[p + 2] ? new TreeNode(levelOrder[p + 2]) : null;
        track.push(node.left, node.right);
        // 无节点
      } else {
        track.push(null, null);
      }
      p += 2;
    }
  }

  return res;
}

console.log(build([3, 9, 20, null, null, 15, 7]));
```
