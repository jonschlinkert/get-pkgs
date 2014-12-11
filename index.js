/*!
 * get-pkgs <https://github.com/jonschlinkert/get-pkgs>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var async = require('async');
var pkg = require('package-json');

module.exports = function packages(repos, version, cb) {
  if (typeof version === 'function') {
    cb = version;
    version = 'latest';
  }

  async.reduce(arrayify(repos), [], function(acc, repo, next) {
    pkg(repo, version, function(err, json) {
      if (err) {
        next(err);
        return;
      }
      next(null, acc.concat(json));
    });
  }, cb);
};

function arrayify(val) {
  return !Array.isArray(val)
    ? [val]
    : val;
}