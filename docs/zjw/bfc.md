# 块级格式化上下文（Block Formatting Context）

它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用

简单解析：BFC 创建一个完全独立的布局环境，让空间里子元素不会影响到外面布局

## 用于定位与清除浮动

- 包含内部浮动
- 排除外部浮动
- 阻止外边距重叠

## 创建 BFC 的主要方式

- html 元素（display: flow-root）
- 定位与布局方式，position：`absolute`、`fixed`；float：值不为 `none`；display：`inline-block`、`table`、`flex`、`grid`
- 溢出行为，overflow 值不为 `visible` 的块元素

## 扩展

### 两栏布局，一列固定宽度，一列自适应

- float + BFC 或 margin-left
- absolute + margin-left
- inline-block 设置 width：\<percentage>
- table
- flex
- grid

<div>
    <p>float + BFC 或 margin-left （父元素高度塌陷问题）</p>
    <div :class="$style.row">
      <div :class="$style.float"></div>
      <div style="display: flow-root"></div>
    </div>
    <p>absolute + margin-left</p>
    <div :class="$style.row" style="position: relative">
      <div style="position: absolute"></div>
      <div style="margin-left: 100px"></div>
    </div>
    <p>inline-block（内联块之间空白符会当作一个字符，可以通过 font-size:0 消除）</p>
    <div :class="$style.row" style="font-size: 0">
      <div style="display: inline-block"></div>
      <div style="display: inline-block; width: calc(100% - 100px)"></div>
    </div>
    <p>table（未设置宽的一列自动填充剩余空间）</p>
    <div :class="$style.row" style="display: table; width: 100%">
      <div style="display: table-cell"></div>
      <div style="display: table-cell"></div>
    </div>
    <p>flex</p>
    <div :class="$style.row" style="display: flex">
      <div></div>
      <div style="flex-grow: 1"></div>
    </div>
    <p>grid</p>
    <div :class="$style.row" style="display: grid; grid-template-columns: 100px auto">
      <div></div>
      <div></div>
    </div>
</div>

> 代码仓库：<https://github.com/dobble11/daydayup-playground/blob/main/two-col-layout/index.html>

<style module>
  .row > :first-child {
    width: 100px;
    height: 100px;
    border: 2px solid rebeccapurple;
  }
  .row > :nth-child(2) {
    border: 2px solid orange;
    height: 100px;
  }

  .float {
    float: left;
  }
</style>
