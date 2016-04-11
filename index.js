/*!
 * get-pkgs <https://github.com/jonschlinkert/get-pkgs>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

module.exports = function get(repos, cb) {
  if (typeof cb !== 'function') {
    throw new TypeError('expected a callback function');
  }

  if (typeof repos === 'string') {
    repos = [repos];
  }

  if (!Array.isArray(repos)) {
    cb(new TypeError('expected a string or array'));
    return;
  }

  utils.reduce(repos, [], function(acc, name, next) {
    utils.pkg(name, function(err, pkg) {
      if (err) {
        if (err.code === 404) {
          var symbol = utils.yellow(utils.warning);
          console.error('', symbol, 'WARNING: npm package "' + err.pkgName + '" does not exist');
          next(null, acc);
          return;
        }
        if (err && err.message !== 'document not found') {
          next(err);
          return;
        }
      }
      next(null, acc.concat(pkg || []));
    });
  }, cb);
};
