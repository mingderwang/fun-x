const Sequence = require('sequence');
(function (exports) {
  'use strict';

  var Sequence = exports.Sequence || require('sequence').Sequence
    , sequence = Sequence.create()
    , err
    ;

  sequence
    .then(function (next) {
      setTimeout(function () {
        next(err, "Hi", "World!");
      }, 120);
    })
    .then(function (next, err, a, b) {
      setTimeout(function () {
        next(err, "Hello", b);
      }, 270);
    })
    .then(function (next, err, a, b) {
      setTimeout(function () {
        console.log(a, b);
        next();
      }, 50);
    });

// so that this example works in browser and node.js
}('undefined' !== typeof exports && exports || new Function('return this')()));
