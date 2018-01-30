stream-sort
===========

[![NPM Version](https://img.shields.io/npm/v/stream-sort.svg?style=flat)](https://npmjs.org/package/stream-sort)
[![NPM Downloads](https://img.shields.io/npm/dm/stream-sort.svg?style=flat)](https://npmjs.org/package/stream-sort)
[![Build Status](https://travis-ci.org/addaleax/stream-sort.svg?style=flat&branch=master)](https://travis-ci.org/addaleax/stream-sort?branch=master)
[![Coverage Status](https://coveralls.io/repos/addaleax/stream-sort/badge.svg?branch=master)](https://coveralls.io/r/addaleax/stream-sort?branch=master)
[![Dependency Status](https://david-dm.org/addaleax/stream-sort.svg?style=flat)](https://david-dm.org/addaleax/stream-sort)

Pick the top `n` entries from an object-mode stream.

Install:
`npm install stream-sort`

```js
// Create
const sorter = require('stream-sort');

// Read objects from input...
const writable = input
  .pipe(sorter(42))
  .on('finish', () => {
    // Prints the top 42 sorted entries.
    console.log(writable.get());
  });

// alternatively listen to the result event
writable.on('result', (sorted) => { ... });
```

API:
* `sorter(count)` -- `count` defaults to 1.
* `sorter({ count: n, compare: function(a, b) { ... })` -- `compare` works as for `Array.prototype.sort`.
* `count` can be `Infinity`.

License
=======

MIT
