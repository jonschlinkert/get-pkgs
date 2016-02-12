/*!
 * get-pkgs <https://github.com/jonschlinkert/get-pkgs>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

module.exports = function get(repos, cb) {
  if (typeof cb !== 'function') {
    throw new TypeError('expected callback to be a function');
  }

  if (typeof repos === 'string') {
    repos = [repos];
  }

  if (!Array.isArray(repos)) {
    throw new TypeError('expected the first argument to be a string or array');
  }

  var i = 0;
  utils.async.map(repos, utils.pkg, function(err, res) {
    var name = repos[i];
    i++;

    if (err) {
      if (err.message !== 'document not found') {
        cb(err);
        return;
      }
      console.error('npm package "%s" does not exist', name);
      res = res.filter(Boolean);
    }
    cb(null, res);
  });
};
