# 实现导入转换 babel 插件

转换 antd 导入为按需加载，例如

```js
import { Button } from 'antd'

⬇️    ⬇️     ⬇️
import Button from 'antd/es/button'
import 'antd/es/button/style'
```
