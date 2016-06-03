/*!
 * get-pkgs <https://github.com/jonschlinkert/get-pkgs>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

module.exports = function get(repos, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

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

  options = options || {};

  utils.each(repos, function(name, next) {
    utils.pkg(name, function(err, pkg) {
      if (err) {
        if (err.message === 'document not found' && options.silent) {
          next();
          return;
        }
        next(err);
        return;
      }
      next(null, pkg);
    });
  }, function(err, pkgs) {
    if (err) {
      cb(err);
      return;
    }
    cb(null, pkgs.filter(Boolean));
  });
};
