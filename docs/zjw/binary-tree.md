# 二叉树

- 满二叉树（完美二叉树）：除了叶节点，每个节点度都为 2
- 完全二叉树：除去最后一层为满二叉树，且最后一层节点从左到右分布
- 完满二叉树：除了叶子结点之外的每一个结点都有两个孩子结点

<table align="center">
  <tr>
    <td>
      <img src="../assets/12.png" />
      <p>满二叉树</p>
    </td>
    <td>
      <img src="../assets/10.png" />
      <p>完全二叉树</p>
    </td>
    <td>
      <img src="../assets/11.png" />
      <p>完满二叉树</p>
    </td>
  </tr>
</table>

高度为 H 的一棵满 K 叉树，其节点总数为等比数列求和公式 (K^H - 1)/(K - 1)，用 Big O 表示就是 O(K^H)

满二叉树节点树为 2^h - 1，结点总数为 n 的满二叉树高度为 log (n+1)

## 完全二叉树层序遍历结果还原

![tree.jpg](../assets/4.jpg)

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

## 中序+后序遍历结果还原

```js
function build(inorder, inStart, inEnd, postorder, postStart, postEnd) {
  if (inStart > inEnd) return null;

  var rootVal = postorder[postEnd];
  // rootVal在中序中的索引
  var index = 0;

  for (var i = inStart; i <= inEnd; i++) {
    if (inorder[i] === rootVal) {
      index = i;
      break;
    }
  }
  var leftSize = index - inStart;
  var root = new TreeNode(rootVal);
  root.left = build(inorder, inStart, index - 1, postorder, postStart, postStart + leftSize - 1);
  root.right = build(inorder, index + 1, inEnd, postorder, postStart + leftSize, postEnd - 1);
  return root;
}

function buildTree(inorder, postorder) {
  return build(inorder, 0, inorder.length - 1, postorder, 0, postorder.length - 1);
}
```

## 中序+前序遍历结果还原

```js
function build(preorder, preStart, preEnd, inorder, inStart, inEnd) {
  if (preStart > preEnd) return null;

  var rootVal = preorder[preStart];
  // rootVal在中序中的索引
  var index = 0;

  for (var i = inStart; i <= inEnd; i++) {
    if (inorder[i] === rootVal) {
      index = i;
      break;
    }
  }
  var leftSize = index - inStart;
  var root = new TreeNode(rootVal);
  root.left = build(preorder, preStart + 1, preStart + leftSize, inorder, inStart, index - 1);
  root.right = build(preorder, preStart + leftSize + 1, preEnd, inorder, index + 1, inEnd);
  return root;
}

function buildTree(preorder, inorder) {
  return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
}
```
