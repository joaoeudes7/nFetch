# nFetch
Simplified HTTP request client (< 1kb)

[![npm](https://img.shields.io/npm/v/nfetch.svg)](https://www.npmjs.com/package/nfetch)
[![bundlephobia](https://img.shields.io/bundlephobia/minzip/nfetch.svg?style=flat)](https://bundlephobia.com/result?p=nfetch)
[![npm](https://img.shields.io/npm/dm/nfetch.svg)](https://www.npmjs.com/package/nfetch)


## Request method aliases
For convenience aliases have been provided for all supported request methods.

```js
nfetch.get(url, config)
nfetch.delete(url, config)
nfetch.post(url, data, config)
nfetch.put(url, data, config)
```

## Configure API
![Config](./config-demo.png)

## Demo
```js
 new nfetch().get('https://jsonplaceholder.typicode.com/todos/1')
    .then(data => console.log(data.data))
    .catch(error => console.log(error));
```
