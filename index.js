/** @directiv data-stateless */

/**
 * Module dependencies
 */

var parser = require('directiv-util-range-parser');

exports.requires = ['hyper-store'];

exports.exposes = [
  'data-hyper-repeat',
  'data-repeat'
];

var REGEX = /^ *([^ ]+) +(?:in|\<\-) +([^ \[]+)(\[[^\]]*\])? *$/;

/**
 * In
 *   user in users
 *
 * Arrow
 *   user <- users
 *
 * Range with step
 *   user in users[0,2..8]
 *
 * Merge a stream - TODO
 *   user in [.featured[0..2] .famous[0..2] .others[0..2]]
 */

exports.compile = function(input) {
  var res = input.match(REGEX);
  if (!res) throw new Error('Invalid expression: "' + input + '"');

  var range = res[3];
  var parsedRange;
  if (range) {
    parsedRange = parser(range);
    if (parsedRange === null) throw new Error('Invalid range expression: "' + range + '" in "' + input + '"');
  }

  var path = res[2];
  var source = path.split('.');

  // TODO support ranges
  if (parsedRange) throw new Error('Ranges are not supported at this time');

  return {
    target: res[1],
    path: path,
    source: source[source.length - 1],
    range: parsedRange
  };
};

exports.state = function(config, state) {
  var res = this('hyper-store').get(config.path, state.get());
  if (!res.completed) return false;
  return state.set(config.source, res.value);
};

exports.children = function(config, state, children) {
  var items = state.get(config.source);
  var arr = [];
  if (!items) return arr;

  var target = config.target;

  var childState;
  var i, c, child;

  for (i = 0; i < items.length; i++) {
    childState = state.set(target, items[i]);
    for (c = 0; c < children.length; c++) {
      child = children[c];
      if (child) arr.push(child.set('state', childState));
    }
  }

  return arr;
};
