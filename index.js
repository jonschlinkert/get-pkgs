/*!
 * get-pkgs <https://github.com/jonschlinkert/get-pkgs>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var chalk = require('chalk');
var async = require('async');
var filter = require('filter-object');
var pkg = require('package-json');

module.exports = function get(repos, pattern, cb) {
  if (typeof pattern === 'function') {
    cb = pattern; pattern = '*';
  }

  async.reduce(arrayify(repos), [], function(acc, repo, next) {
    pkg(repo, 'latest', function (err, json) {
      if (err) {
        console.log(chalk.red(err + ': "') + chalk.bold(repo) + '"');
        return next(err);
      }
      next(null, acc.concat(filter(json, pattern)));
    });
  }, cb);
};

function arrayify(val) {
  return !Array.isArray(val) ? [val] : val;
}
