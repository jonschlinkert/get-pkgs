/*!
 * get-pkgs <https://github.com/jonschlinkert/get-pkgs>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var bold = require('ansi-bold');
var red = require('ansi-red');
var async = require('async');
var filter = require('filter-object');
var request = require('min-request');

module.exports = function get(repos, pattern, cb) {
  if (typeof pattern === 'function') {
    cb = pattern; pattern = '*';
  }

  async.reduce(arrayify(repos), [], function(acc, repo, next) {
    pkg(repo, 'latest', function (err, json) {
      if (err) {
        console.log(red(err + ': "') + bold(repo) + '"');
        return next(err);
      }
      next(null, acc.concat(filter(json, pattern)));
    });
  }, cb);
};

function arrayify(val) {
  return !Array.isArray(val) ? [val] : val;
}

function pkg(name, version, cb) {
  var url = 'https://registry.npmjs.org/' + name + '/';

  if (typeof version !== 'string') {
    cb = version;
    version = '';
  }
  request(url + version, {}, function (err, res) {
    if (err) return cb(err);
    cb(null, JSON.parse(res.body));
  });
}
