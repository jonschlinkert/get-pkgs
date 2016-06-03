'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('async-each', 'each');
require('get-pkg', 'pkg');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
