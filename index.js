'use strict';

var stream;
try {
  stream = require('readable-stream');
} catch (e) {
  stream = require('stream');
}

var util = require('util');
var assert = require('assert');

function Sorter(opts) {
  if (!(this instanceof Sorter)) {
    return new Sorter(opts);
  }

  if (typeof opts === 'number') {
    opts = { count: opts };
  }

  opts = opts || {};
  opts.objectMode = true;
  stream.Writable.call(this, opts);

  this.count = opts.count || 1;
  this.compare = opts.compare || function(a, b) {
    return a < b ? -1 : a > b ? +1 : 0;
  };

  this.currentList = [];
  this.isSorted = false;

  this.on('finish', function() {
    this.emit('result', this.get());
  });
}

util.inherits(Sorter, stream.Writable);

Sorter.prototype._write = function(chunk, encoding, callback) {
  if (this.currentList.length < this.count) {
    this.currentList.push(chunk);
    return callback();
  }

  assert.strictEqual(this.currentList.length, this.count);

  this._maybeSort();

  var currentTail = this.currentList[this.currentList.length-1];
  if (this.compare(chunk, currentTail) <= 0) {
    return callback();
  }

  // Binary search to know where to insert.
  var minPosition = this.count, maxPosition = 0;
  var middle = 0;
  while (maxPosition + 1 < minPosition) {
    middle = parseInt((minPosition + maxPosition) / 2);
    var compared = this.compare(this.currentList[middle], chunk);

    if (compared > 0) {
      maxPosition = middle;
    } else {
      minPosition = middle;
    }
  }

  if (minPosition === 1 && this.compare(chunk, this.currentList[0]) >= 0) {
    minPosition = 0;
  }

  this.currentList.splice(minPosition, 0, chunk);
  this.currentList.pop();

  return callback();
};

Sorter.prototype._maybeSort = function() {
  var compare = this.compare;

  if (!this.isSorted) {
    this.currentList.sort(function(a, b) {
      return -compare(a, b)
    });
    this.isSorted = true;
  }
};

Sorter.prototype.get = function() {
  this._maybeSort();
  return this.currentList;
};

module.exports = Sorter;
