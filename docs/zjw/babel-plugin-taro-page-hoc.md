# 如何解决 Taro 页面无法异步渲染问题

当使用 Taro 开发时，要实现拦截页面渲染做一些异步操作（例如单点登录，前置检查等）

举个自动登录场景，当访问页面链接上带有登录凭证 (ticket) 时，需要调用后端接口实现登录操作，在请求过程中展示一个 loading 样式，我们很容易想到通过入口组件去拦截子元素渲染实现

## Taro H5 端实现

```tsx
class App extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    const ticket = getQuery('ticket');

    if (ticket) {
      this.setState({ loading: true });
      // 模拟异步过程
      setTimeout(() => {
        this.setState({ loading: false });
      }, 2000);
    }
  }

  render() {
    return this.state.loading ? <div>loading</div> : this.props.children;
  }
}

export default App;
```

当运行上面代码，会得到如下报错<br />
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21890133/1669889953255-df4300df-e3ba-4254-928c-d038fd3377d3.png#averageHue=%232d070a&clientId=udb8862c5-8337-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=183&id=u4382e90a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=183&originWidth=1134&originalType=binary&ratio=1&rotation=0&showTitle=false&size=79092&status=done&style=none&taskId=ucc2b8de4-0e66-473b-9202-494760bc255&title=&width=1134)
Taro 遵守小程序设计，所以无法从入口组件拦截子元素的挂载<br />
另一种方式是通过高阶组件去包裹每个页面实现

```tsx
function hoc(Component) {
  return (props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const ticket = getQuery('ticket');

      if (ticket) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    }, []);

    return loading ? <div>loading</div> : <Component {...props} />;
  };
}

export default hoc;

// 包裹页面组件
export default hoc(Home);
```

但是这样带来一个问题，通过约定无法保证每个人新建页面时都会使用这个 hoc<br />既然运行时我们无法通过入口组件拦截整个页面，那是不是可以通过编译时解决

## 通过 Babel 编译时转换页面导出

可以实现一个 babel 插件，获取页面路径，然后匹配到页面组件，转换导出内容，包裹上自定义的 hoc 函数

### step1：获取页面路径

Taro 的页面路径配置在 app.config.ts 文件的 pages 字段，可以通过 babel 解析拿到这个值

```tsx
const srcPath = path.join(process.cwd(), './src');
const filenames = fs.readdirSync(srcPath);
// 查找到app配置文件路径
const appConfigPath = `${srcPath}/${filenames.find((m) => m.includes('app.config.'))}`;
let pages: string[] = [];

if (fs.existsSync(appConfigPath)) {
  const code = fs.readFileSync(appConfigPath).toString();
  // 读取文件，转换成 ast
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['typescript'],
  });
  traverse(ast, {
    // 查找数组元素
    ArrayExpression(path) {
      if (
        t.isObjectProperty(path.parent) &&
        t.isIdentifier(path.parent.key) &&
        // 判断属性名为 pages
        path.parent.key.name === 'pages'
      ) {
        // 获取 pages 的值
        pages = pages.concat(path.node.elements.map((m: any) => m.value));
      }
    },
  });
}
```

这样我们就可以拿到 Taro 所有的页面路径

### step2：遍历默认导出找到页面组件

```tsx
{
  ExportDefaultDeclaration(path, state) {
    // 当前代码的文件名
    const filename = state.filename;
    // 通过排除config文件及匹配上一步中获取的路径找到页面组件
    const isPage = filename.includes('.config.')
      ? false
      : pages.some((m) => state.filename.includes(m));
    }
  },
}
```

### step3：转换

```tsx
{
  ExportDefaultDeclaration(path, state) {
    const hocSource='src/component/hoc'
    const hocName='__hoc__'

    if (!t.isClassDeclaration(path.node.declaration) && isPage) {
      // 在前面插入导入语句
      path.insertBefore(
        t.importDeclaration(
          [t.importDefaultSpecifier(t.identifier(hocName))],
          t.stringLiteral(hocSource),
        ),
      );
      // hoc 包裹导出
      path.node.declaration = t.callExpression(t.identifier(hocName), [
        path.node.declaration as any,
      ]);
    }
  },
}

// 例如页面组件 Home 转换后输出
⬇️     ⬇️     ⬇️
import __hoc__ from 'src/component/hoc'
export default __hoc__(Home)
```

> 更完整的实现：[https://github.com/epeejs/babel-plugin-taro-page-hoc](https://github.com/epeejs/babel-plugin-taro-page-hoc)
