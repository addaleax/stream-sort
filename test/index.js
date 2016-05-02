'use strict';

var Sorter = require('../');
var assert = require('assert');

describe('Sorter', function() {
  it('sorts an array', function() {
    var count = 10;
    var instance = new Sorter(count);

    var input = [];
    for (var i = 0; i < 105; i++) {
      input.push(Math.random());
    }

    input.forEach(instance.write.bind(instance));
    instance.end();
    var streamSorted = instance.get();
    var ownSorted = input.slice().sort().reverse().slice(0, count);
    assert.deepEqual(streamSorted, ownSorted);
  });

  it('sorts a specific array', function() {
    var count = 10;
    var instance = new Sorter(count);

    var input = [ 0.8856841704019038,
        0.22402971650338976,
        0.6601940107085091,
        0.04306306275819893,
        0.6230528691572526,
        0.18791568936435077,
        0.8897568137603205,
        0.6318506084228446,
        0.8740348962641509,
        0.9352672506637916,
        0.6810473744444501];

    input.forEach(instance.write.bind(instance));
    instance.end();
    var streamSorted = instance.get();
    var ownSorted = input.slice().sort().reverse().slice(0, count);
    assert.deepEqual(streamSorted, ownSorted);
  });

  it('sorts an array, no `new`', function() {
    var count = 20;
    var instance = Sorter(count);

    var input = [];
    for (var i = 0; i < 105; i++) {
      input.push(Math.random());
    }

    input.forEach(instance.write.bind(instance));
    instance.end();
    var streamSorted = instance.get();
    var ownSorted = input.slice().sort().reverse().slice(0, count);
    assert.deepEqual(streamSorted, ownSorted);
  });

  it('sorts an array, options object', function() {
    var count = 105;
    var instance = Sorter({count: count});

    var input = [];
    for (var i = 0; i < 105; i++) {
      input.push(Math.random());
    }

    input.forEach(instance.write.bind(instance));
    instance.end();
    var streamSorted = instance.get();
    var ownSorted = input.slice().sort().reverse().slice(0, count);
    assert.deepEqual(streamSorted, ownSorted);
  });

  it('picks the top entry in an array', function() {
    var count = 1;
    var instance = Sorter();

    var input = [];
    for (var i = 0; i < 105; i++) {
      input.push(Math.random());
    }

    input.forEach(instance.write.bind(instance));
    instance.end();
    var streamSorted = instance.get();
    var ownSorted = input.slice().sort().reverse().slice(0, count);
    assert.deepEqual(streamSorted, ownSorted);
  });

  it('picks the top entry in an array, strings edition', function() {
    var count = 2;
    var instance = Sorter(count);

    var input = [];
    for (var i = 0; i < 26; i++) {
      input.push(String.fromCharCode('a'.charCodeAt(0) + i));
    }
    // duplicate
    input.push.apply(input, input.slice());

    input.forEach(instance.write.bind(instance));
    instance.end();
    var streamSorted = instance.get();
    var ownSorted = input.slice().sort().reverse().slice(0, count);
    assert.deepEqual(streamSorted, ownSorted);
  });

  it('picks the top entry in an array, Infinity edition', function() {
    var count = Infinity;
    var instance = Sorter(count);

    var input = [];
    for (var i = 0; i < 26; i++) {
      input.push(String.fromCharCode('a'.charCodeAt(0) + i));
    }
    // duplicate
    input.push.apply(input, input.slice());

    input.forEach(instance.write.bind(instance));
    instance.end();
    var streamSorted = instance.get();
    assert.strictEqual(streamSorted.length, input.length);
    var ownSorted = input.slice().sort().reverse().slice(0, count);
    assert.deepEqual(streamSorted, ownSorted);
  });
});
