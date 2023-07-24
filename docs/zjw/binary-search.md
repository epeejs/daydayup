# 二分查找

## 基本实现

```js
function binarySearch(nums, target) {
  var left = 0,
    right = nums.length - 1;

  while (left <= right) {
    var mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }

  return -1;
}
```

## 寻找左侧边界

```js
function leftBound(nums, target) {
  var left = 0,
    right = nums.length - 1;

  while (left <= right) {
    var mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      // 向左收缩
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }

  // left = right + 1 退出循环，mid = right + 1 所以 left = mid
  if (left >= nums.length || nums[left] !== target) {
    return -1;
  }

  return left;
}
```

## 寻找右侧边界

```js
function rightBound(nums, target) {
  var left = 0,
    right = nums.length - 1;

  while (left <= right) {
    var mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      // 向右收缩
      left = mid + 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }

  // right = left - 1 退出循环，mid = left - 1 所以 right = mid
  if (right < 0 || nums[right] !== target) {
    return -1;
  }

  return right;
}
```
