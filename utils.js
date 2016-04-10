'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('async');
require('get-pkg', 'pkg');
require('warning-symbol', 'warning');
require('ansi-yellow', 'yellow');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
