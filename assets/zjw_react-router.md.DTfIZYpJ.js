import{_ as s,c as i,o as a,a4 as t}from"./chunks/framework.D5F7AbHZ.js";const h="/daydayup/assets/9.DyWMZ0Kk.webp",y=JSON.parse('{"title":"react-router 实现","description":"","frontmatter":{},"headers":[],"relativePath":"zjw/react-router.md","filePath":"zjw/react-router.md"}'),n={name:"zjw/react-router.md"},e=t(`<h1 id="react-router-实现" tabindex="-1">react-router 实现 <a class="header-anchor" href="#react-router-实现" aria-label="Permalink to &quot;react-router 实现&quot;">​</a></h1><h2 id="history" tabindex="-1">history <a class="header-anchor" href="#history" aria-label="Permalink to &quot;history&quot;">​</a></h2><ul><li><p>pushState 与 replaceState 改变路由，不会触发路由事件</p></li><li><p>监听路由改变事件（只在浏览器行为下触发，前进后退、history 方法 forward、back、go）</p><p>window.addEventListener(&#39;popstate&#39;,function(e){ // 监听改变 })</p><p>需要修改 nginx 支持路由重定向到 index.html</p></li></ul><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> / </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   try_files </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$uri $uri/ /index.html;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span></code></pre></div><h2 id="hash" tabindex="-1">hash <a class="header-anchor" href="#hash" aria-label="Permalink to &quot;hash&quot;">​</a></h2><ul><li><p>location.hash 设置改变路由</p></li><li><p>onhashchange 监听路由改变</p><p>window.addEventListener(&#39;onhashchange&#39;,function(e){ // 监听改变 })</p></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  location.hash </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> hashIndex</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> location.href.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">indexOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;#&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> href</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> hashIndex </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> url </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> url.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">slice</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, hashIndex);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  location.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(href </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;#&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>v5 版本：路由改变 history 创建新的 location 对象，Router 监听 history 触发的事件，并更新 RouterContext 的 location 值，触发 Switch 匹配 Route 并渲染</p><p><img src="`+h+'" alt=""></p><p>图片来源：<a href="https://juejin.cn/post/6886290490640039943" target="_blank" rel="noreferrer">https://juejin.cn/post/6886290490640039943</a></p>',11),l=[e];function p(k,r,d,o,E,c){return a(),i("div",null,l)}const u=s(n,[["render",p]]);export{y as __pageData,u as default};
