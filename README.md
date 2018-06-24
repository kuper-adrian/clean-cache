# Clean Cache

[![Build Status](https://travis-ci.org/kuper-adrian/clean-cache.svg?branch=master)](https://travis-ci.org/kuper-adrian/clean-cache)
[![Coverage Status](https://coveralls.io/repos/github/kuper-adrian/clean-cache/badge.svg?branch=master)](https://coveralls.io/github/kuper-adrian/clean-cache?branch=master)
[![dependencies Status](https://david-dm.org/kuper-adrian/clean-cache/status.svg)](https://david-dm.org/kuper-adrian/clean-cache)

[![NPM](https://nodei.co/npm/clean-cache.png?compact=true)](https://nodei.co/npm/clean-cache/)

Simple single-file, in-memory javascript cache fully tested and without any dependencies.

Initially part of [statg](https://github.com/kuper-adrian/statg-bot).

## Install
```
npm install clean-cache
```

## Use
```javascript
const { Cache } = require('clean-cache');

const myCache = new Cache(30000);       // ttl in ms, if omitted defaults to 60s

// adding items
myCache.add('1', { foo: 'bar' });       // adds object under key '1' for 30s
myCache.add('2', { foo: 'bar' }, 1000); // expires in 1s instead of 30s
myCache.add(null, { foo: 'bar' });      // throws error
myCache.add(undefined, { foo: 'bar' }); // throws error

// retrieving items
myCache.retrieve('1');                  // returns { foo: 'bar' }
myCache.retrieve('non-existent');       // returns null
myCache.retrieve(null);                 // throws error
myCache.retrieve(undefined);            // throws error

// other
myCache.count();                        // returns number of objects in cache
myCache.tidy();                         // removes all expired items from cache
```

## License
MIT