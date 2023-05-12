import{_ as e,c as i,z as l,n as o,R as s,a,o as n}from"./chunks/framework.3876c926.js";const d="_row_7kqxf_2",c="_float_7kqxf_12",r={row:d,float:c},G=JSON.parse('{"title":"块级格式化上下文（Block Formatting Context）","description":"","frontmatter":{},"headers":[],"relativePath":"zjw/bfc.md"}'),_={name:"zjw/bfc.md"},h=s('<h1 id="块级格式化上下文-block-formatting-context" tabindex="-1">块级格式化上下文（Block Formatting Context） <a class="header-anchor" href="#块级格式化上下文-block-formatting-context" aria-label="Permalink to &quot;块级格式化上下文（Block Formatting Context）&quot;">​</a></h1><p>它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用</p><p>简单解析：BFC 创建一个完全独立的布局环境，让空间里子元素不会影响到外面布局</p><h2 id="用于定位与清除浮动" tabindex="-1">用于定位与清除浮动 <a class="header-anchor" href="#用于定位与清除浮动" aria-label="Permalink to &quot;用于定位与清除浮动&quot;">​</a></h2><ul><li>包含内部浮动</li><li>排除外部浮动</li><li>阻止外边距重叠</li></ul><h2 id="创建-bfc-的主要方式" tabindex="-1">创建 BFC 的主要方式 <a class="header-anchor" href="#创建-bfc-的主要方式" aria-label="Permalink to &quot;创建 BFC 的主要方式&quot;">​</a></h2><ul><li>html 元素（display: flow-root）</li><li>定位与布局方式，position：<code>absolute</code>、<code>fixed</code>；float：值不为 <code>none</code>；display：<code>inline-block</code>、<code>table</code>、<code>flex</code>、<code>grid</code></li><li>溢出行为，overflow 值不为 <code>visible</code> 的块元素</li></ul><h2 id="扩展" tabindex="-1">扩展 <a class="header-anchor" href="#扩展" aria-label="Permalink to &quot;扩展&quot;">​</a></h2><h3 id="两栏布局-一列固定宽度-一列自适应" tabindex="-1">两栏布局，一列固定宽度，一列自适应 <a class="header-anchor" href="#两栏布局-一列固定宽度-一列自适应" aria-label="Permalink to &quot;两栏布局，一列固定宽度，一列自适应&quot;">​</a></h3><ul><li>float + BFC 或 margin-left</li><li>absolute + margin-left</li><li>inline-block 设置 width：&lt;percentage&gt;</li><li>table</li><li>flex</li><li>grid</li></ul>',10),u=l("p",null,"float + BFC 或 margin-left （父元素高度塌陷问题）",-1),f=l("div",{style:{display:"flow-root"}},null,-1),p=l("p",null,"absolute + margin-left",-1),b=l("div",{style:{position:"absolute"}},null,-1),y=l("div",{style:{"margin-left":"100px"}},null,-1),m=[b,y],g=l("p",null,"inline-block（内联块之间空白符会当作一个字符，可以通过 font-size:0 消除）",-1),v=l("div",{style:{display:"inline-block"}},null,-1),k=l("div",{style:{display:"inline-block",width:"calc(100% - 100px)"}},null,-1),w=[v,k],x=l("p",null,"table（未设置宽的一列自动填充剩余空间）",-1),q=l("div",{style:{display:"table-cell"}},null,-1),$=l("div",{style:{display:"table-cell"}},null,-1),B=[q,$],C=l("p",null,"flex",-1),F=l("div",null,null,-1),P=l("div",{style:{"flex-grow":"1"}},null,-1),T=[F,P],z=l("p",null,"grid",-1),N=l("div",null,null,-1),S=l("div",null,null,-1),V=[N,S],A=l("blockquote",null,[l("p",null,[a("代码仓库："),l("a",{href:"https://github.com/dobble11/daydayup-playground/blob/main/two-col-layout/index.html",target:"_blank",rel:"noreferrer"},"https://github.com/dobble11/daydayup-playground/blob/main/two-col-layout/index.html")])],-1);function j(t,E,I,M,R,J){return n(),i("div",null,[h,l("div",null,[u,l("div",{class:o(t.$style.row)},[l("div",{class:o(t.$style.float)},null,2),f],2),p,l("div",{class:o(t.$style.row),style:{position:"relative"}},m,2),g,l("div",{class:o(t.$style.row),style:{"font-size":"0"}},w,2),x,l("div",{class:o(t.$style.row),style:{display:"table",width:"100%"}},B,2),C,l("div",{class:o(t.$style.row),style:{display:"flex"}},T,2),z,l("div",{class:o(t.$style.row),style:{display:"grid","grid-template-columns":"100px auto"}},V,2)]),A])}const D={$style:r},H=e(_,[["render",j],["__cssModules",D]]);export{G as __pageData,H as default};
