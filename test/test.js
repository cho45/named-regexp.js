#!/usr/bin/env node

var assert = require('assert');
var named = require('../lib/named-regexp.js').named;

var re = named(/(:<foo>[a-z]+) (:<foo>[a-z]+) (:<bar>[a-z]+)/ig);
assert.ok(re instanceof RegExp);

var matched = re.exec('aaa bbb ccc');
assert.deepEqual(matched.captures, { foo: [ 'aaa', 'bbb' ], bar: [ 'ccc' ] });
assert.strictEqual(matched.capture('foo'), 'bbb', 'last matched');
assert.strictEqual(matched.capture('bar'), 'ccc', 'last matched');

var replaced = re.replace('aaa bbb ccc ddd eee fff ggg', function (matched) {
	assert.ok(matched.captures);
	return matched.capture('bar');
});

assert.strictEqual(replaced, 'ccc fff ggg');

