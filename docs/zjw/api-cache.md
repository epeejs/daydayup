# 请求缓存

在 PaaS 组件或者路由中间件内发起的重复请求，多数情况下可以通过请求缓存合并成一个请求

需求

- 扩展现有请求方法
- 合并同一时间内的重复请求

## 定义缓存结构

```js
export class MapCache {
  map = new Map();

  static getKey(parmas) {
    return JSON.stringify(parmas);
  }

  get(key) {
    return this.map.get(key) && this.map.get(key).value;
  }
  set(key, value) {
    return this.map.set(key, { value, timestamp: Date.now() });
  }
  // 按时间是否命中缓存
  hit(key, maxTime) {
    const { timestamp = 0 } = this.map.get(key) || {};

    if (Date.now() - timestamp < maxTime) {
      return true;
    }
    return false;
  }
}
```

## 使用装饰器模式扩展当前请求

```js
export function apiHelper(fn) {
  const apiCache = new MapCache();

  return function (...args) {
    let cache = false;

    // 是否开启缓存
    if (args.length === 2) {
      cache = args.splice(-1)[0];
    }
    if (!cache) {
      return fn.apply(this, args);
    }
    // 处理缓存
    const { maxTime } = typeof cache === 'boolean' ? { maxTime: 1000 } : cache;
    const { url, params, data, method } = args[0];
    const key = ApiCache.getKey({ url, params, data, method });

    if (apiCache.hit(key, maxTime)) {
      return apiCache.get(key);
    }
    const response = fn.apply(this, args);
    // 支持并发请求合并成一个 Promise
    apiCache.set(key, response);

    return response;
  };
}
```

## 使用

```js
import Axios from 'axios';

const request = apiHelper(Axios.request);

// 使用缓存
request({ url: 'http://api.twitter.com', params: { a: 1 } }, true);
```
