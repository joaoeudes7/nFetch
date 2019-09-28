# nFetch
Simplified HTTP request client (< 1kb)

[![npm](https://img.shields.io/npm/v/nfetch.svg)](https://www.npmjs.com/package/nfetch)
[![bundlephobia](https://img.shields.io/bundlephobia/minzip/nfetch.svg?style=flat)](https://bundlephobia.com/result?p=nfetch)
[![npm](https://img.shields.io/npm/dm/nfetch.svg)](https://www.npmjs.com/package/nfetch)


![Config](./config-demo.png)

## Methods and Structures

**Methods**
For convenience aliases have been provided for all supported request methods.

```ts
nfetch.get = (url: string, configs?: IConfig)
nfetch.delete = (url: string, data?: object, configs?: IConfig)
nfetch.post = (url: string, data: object, configs?: IConfig)
nfetch.put = (url: string, data: object, configs?: IConfig)
```

**Configs Structure**
```ts
IConfig {
  baseURL?: string;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: Headers;
  integrity?: string;
  keepalive?: boolean;
  method?: RequestMethod;
  mode?: RequestMode;
  referrerPolicy?: ReferrerPolicy;
  timeout?: number;
}
```

**Response Structure**
```ts
Response {
  url: string;
  data?: any;
  status: number;
  headers?: Headers;

  /**
   * Funcional only in Typescript
   * T: Something `Class` as parameter
   */
  public toObject<T>() {}
}
```

## Configure API
```js
import { nfetch } from 'nfetch';

const api = new nfetch({ baseUrl: 'https://jsonplaceholder.typicode.com' })

api.get('/posts')
  .then(res => console.log(res.data))
  .catch(error => console.log(error))
```

## Docs Parameters
[Click here to view doc of parameters](./docs/parameters)

## Demo
Click here to view in Browser:
[nfetch | Requests | API | Simple Example](https://codesandbox.io/s/0m9x7ooo8v)
