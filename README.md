named-regexp.js
=================

Append named-capture feature to JavaScript RegExp

SYNOPSYS
========

    var named = require('named-regexp').named;

    var re = named(/(:<foo>[a-z]+) (:<foo>[a-z]+) (:<bar>[a-z]+)/ig);
    var matched = re.exec('aaa bbb ccc');
    console.log(matched.captures); //=> { foo: [ 'aaa', 'bbb' ], bar: [ 'ccc' ] }
    console.log(matched.capture('foo')); //=> 'bbb' // last matched


    var replaced = re.replace('aaa bbb ccc ddd eee fff ggg', function (matched) {
        return matched.capture('bar');
    });

    console.log(replaced); //=> 'ccc fff ggg');


DESCRIPTION
===========

named-regexp.js provides `named` function which converts regexp containing named-captures to normal regexp which has some functions.

named-capture is defined by `(:<name>regexp)`. You can't use it with normal captures. If you want to use grouping, use `(?:regexp)` instead.

## Function named()

Takes RegExp object which contains named-captures.

Returns new RegExp object with following methods:

### Method re.exec(string)

Performs a regexp match of string and returns an Array object containing the results of the match, or null if string did not match.

A returning Array object is same as value from normal RegExp.prototype.exec but it has `captures` property and `capture` method.

#### matched.captures

An object contains captured values which has capture name as key and array of captured string as its value.

#### matched.capture('name')

Returns last matched string of the name.

### Method re.replace(string, replace)

Same as `String.prototype.replace` but when `replace` is function, this method passes an Array object like value returning from `exec()`.
