import{_ as s,c as i,o as a,a4 as n}from"./chunks/framework.D5F7AbHZ.js";const g=JSON.parse('{"title":"webpack 打包速度优化","description":"","frontmatter":{},"headers":[],"relativePath":"zjw/webpack-pack-optimization.md","filePath":"zjw/webpack-pack-optimization.md"}'),l={name:"zjw/webpack-pack-optimization.md"},p=n(`<h1 id="webpack-打包速度优化" tabindex="-1">webpack 打包速度优化 <a class="header-anchor" href="#webpack-打包速度优化" aria-label="Permalink to &quot;webpack 打包速度优化&quot;">​</a></h1><p>webpack 是个模块化打包工具，所以影响打包速度的因素主要取决于打包量。</p><p>我们将从减少打包量和 webpack 配置优化两方面讲解优化方法。</p><h2 id="减少打包量" tabindex="-1">减少打包量 <a class="header-anchor" href="#减少打包量" aria-label="Permalink to &quot;减少打包量&quot;">​</a></h2><h4 id="_1-模块按需引入" tabindex="-1">1.模块按需引入 <a class="header-anchor" href="#_1-模块按需引入" aria-label="Permalink to &quot;1.模块按需引入&quot;">​</a></h4><p>例如 antd、echarts、lodash 都支持按需引入，其它支持请查看各包使用文档</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">! lodash</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-import _ from &#39;lodash&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import _map from &#39;lodash/map&#39;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">var users = [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  { &#39;user&#39;: &#39;barney&#39; },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  { &#39;user&#39;: &#39;fred&#39; }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// =&gt; [&#39;barney&#39;, &#39;fred&#39;]</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-_.map(users, &#39;user&#39;);</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+_map(users, &#39;user&#39;);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">! antd</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-import { Button } from &#39;antd&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import Button from &#39;antd/lib/button&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import &#39;antd/lib/button/style/css&#39;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 如果整体引入样式（import &#39;antd/dist/antd.css&#39;），则css无法按需引入</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">! echarts</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-import echarts from &#39;echarts&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import echarts from &#39;echarts/lib/echarts&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import &#39;echarts/lib/component/tooltip&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import &#39;echarts/lib/component/title&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import &#39;echarts/lib/chart/line&#39;;</span></span></code></pre></div><blockquote><p>一些插件可以保持当前整体引入的写法，通过插件自动转换成按需引入写法</p><ul><li>lodash：<a href="https://github.com/lodash/babel-plugin-lodash" target="_blank" rel="noreferrer">babel-plugin-lodash</a></li><li>antd：<a href="https://github.com/ant-design/babel-plugin-import" target="_blank" rel="noreferrer">babel-plugin-import</a></li></ul></blockquote><h4 id="_2-移除未使用的引入模块" tabindex="-1">2.移除未使用的引入模块 <a class="header-anchor" href="#_2-移除未使用的引入模块" aria-label="Permalink to &quot;2.移除未使用的引入模块&quot;">​</a></h4><p>未使用的引入，webpack 还是会进行打包，可以开启 eslint 的 <code>no-unused-vars</code> 规则为 <code>error</code> 避免不必要的导入，还可以限制空函数等。</p><h4 id="_3-统一技术栈-避免同类型包引入" tabindex="-1">3.统一技术栈，避免同类型包引入 <a class="header-anchor" href="#_3-统一技术栈-避免同类型包引入" aria-label="Permalink to &quot;3.统一技术栈，避免同类型包引入&quot;">​</a></h4><h2 id="webpack-配置优化" tabindex="-1">webpack 配置优化 <a class="header-anchor" href="#webpack-配置优化" aria-label="Permalink to &quot;webpack 配置优化&quot;">​</a></h2><p>开发环境应该避免不必要的 loader 与 plugin ，如 postcss，uglifyjs-webpack-plugin 等，只启用保证运行的工具。</p><h4 id="_1-移除不必要的-polyfill-与兼容-loader-适用-dev" tabindex="-1">1.移除不必要的 polyfill 与兼容 loader（适用 dev） <a class="header-anchor" href="#_1-移除不必要的-polyfill-与兼容-loader-适用-dev" aria-label="Permalink to &quot;1.移除不必要的 polyfill 与兼容 loader（适用 dev）&quot;">​</a></h4><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">//webpack.config.dev.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">module.exports = {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  entry: [</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-   require.resolve(&#39;./polyfills&#39;)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        test: /\\.css$/,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        use: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              &#39;style-loader&#39;,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              &#39;css-loader&#39;,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-             &#39;postcss-loader&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><h4 id="_2-dllplugin-预编译与-ignoreplugin-忽略语言文件打包-适用-dev-和-prod" tabindex="-1">2.DllPlugin 预编译与 IgnorePlugin 忽略语言文件打包（适用 dev 和 prod） <a class="header-anchor" href="#_2-dllplugin-预编译与-ignoreplugin-忽略语言文件打包-适用-dev-和-prod" aria-label="Permalink to &quot;2.DllPlugin 预编译与 IgnorePlugin 忽略语言文件打包（适用 dev 和 prod）&quot;">​</a></h4><p>可以通过 DllPlugin 插件将公共模块预编译，减少构建时间</p><ul><li>创建 config/webpack.config.dll.js 文件</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> path</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;path&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> webpack</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;webpack&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  entry: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    vendor: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &#39;react&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &#39;react-dom&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &#39;react-router&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &#39;react-router-dom&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &#39;react-router-redux&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &#39;redux&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &#39;react-redux&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &#39;redux-thunk&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &#39;axios&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &#39;react-intl-universal&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &#39;antd&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    path: path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">join</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(__dirname, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;../public/static/js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 放在项目的static/js目录下面</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    filename: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;[name].dll.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 打包文件的名字</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    library: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;[name]_library&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 暴露出的全局变量名，需要与插件name对应</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> webpack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">IgnorePlugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">^</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">\\.\\/</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">locale</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">moment</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> webpack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">DllPlugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      path: path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">join</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(__dirname, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;[name]-manifest.json&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 生成模块清单文件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;[name]_library&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }),</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> webpack.optimize.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">UglifyJsPlugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      compress: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        warnings: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        comparisons: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      output: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        comments: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ascii_only: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      parallel: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 并行压缩代码</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      sourceMap: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  devtool: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;source-map&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><ul><li>修改 package.json 的 scripts</li></ul><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &quot;scripts&quot;: {</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    &quot;build:dll&quot;: &quot;webpack --config config/webpack.config.dll.js -p&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span></code></pre></div><p>运行 <code>npm run build:dll</code> 会在 config/ 下生成 vendor-manifest.json 打包清单文件，用于 DllReferencePlugin 插件忽略掉已预编译的模块，从而减少打包量。 同时会在 public/static/js/ 下生成打包文件</p><ul><li>修改 dev 与 prod 的 webpack 配置文件</li></ul><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">module.exports = {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    new webpack.DllReferencePlugin({</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+     manifest: require(&#39;./vendor-manifest.json&#39;)</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><ul><li>修改 index.html 添加 dll 包的引用</li></ul><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+  &lt;script src=&quot;%PUBLIC_URL%/static/js/vendor.dll.js&quot;&gt;&lt;/script&gt;</span></span></code></pre></div><blockquote><p>注：如果报公共库找不到，先检查 public/static/js/vendor.dll.js 是否存在，否则先构建公共库 <code>npm run build:dll</code>，如果修改或升级预编译的模块也需要重新构建公共库</p></blockquote><h2 id="升级-webpack-等构建工具" tabindex="-1">升级 webpack 等构建工具 <a class="header-anchor" href="#升级-webpack-等构建工具" aria-label="Permalink to &quot;升级 webpack 等构建工具&quot;">​</a></h2>`,28),h=[p];function e(t,k,E,r,d,c){return a(),i("div",null,h)}const y=s(l,[["render",e]]);export{g as __pageData,y as default};
