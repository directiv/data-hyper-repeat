/**
 * Module dependencies
 */

var parser = require('directiv-util-range-parser');
hyperRepeat.requires = ['store-hyper'];

/**
 * Expose the 'hyper-repeat' directive
 */

module.exports = hyperRepeat;

/**
 * Initialize the 'hyper-repeat' directive
 *
 * Examples:
 *
 *   user <- users
 *
 *   user <- users[0,2..8]
 *
 *   user <- [.featured[0..2] .famous[0..2] .others[0..2]]
 *
 * @param {StoreHyper}
 */

function hyperRepeat(store) {
  this.compile = compile;

  this.state = function(config, state) {
    var res = store.get(config.path, state);
    if (!res.completed) return false;
    return state.set(config.source, res.value);
  };

  this.children = function(config, state, children) {
    var items = state.get(config.source);
    var arr = [];
    if (!items) return arr;

    var target = config.target;
    var i, c, child;

    var path = ['state', target];

    for (i = 0; i < items.length; i++) {
      function update() {return items[i]};

      for (c = 0; c < children.length; c++) {
        child = children[c];
        if (!child) continue;
        // TODO set the key prop
        child = child.updateIn(path, update);
        arr.push(child);
      }
    }
    return arr;
  };
}

/**
 * Setup the regex for parsing
 */

var REGEX = /^ *([^ ]+) +(?:in|\<\-) +([^ \[]+)(\[[^\]]*\])? *$/;

/**
 * Compile a 'hyper-repeat' expression
 */

function compile(input) {
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
  if (parsedRange) console.warn('data-hyper-repeat ranges are not supported at this time');

  return {
    target: res[1],
    path: path,
    source: source[source.length - 1],
    range: parsedRange
  };
};
