/*!
 * get-pkgs <https://github.com/jonschlinkert/get-pkgs>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const pkg = require('get-pkg');

module.exports = (names, options, cb) => {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  names = [].concat(names || []);
  let opts = options || {};
  let pending = [];
  let pkgs = [];

  for (let name of names) {
    let promise = pkg(name)
      .then(res => res && pkgs.push(res))
      .catch(err => {
        if (err.message === 'document not found' && opts.silent) return;
        return Promise.reject(err);
      });

    pending.push(promise);
  }

  let p = Promise.all(pending);

  if (typeof cb === 'function') {
    p.then(() => cb(null, pkgs)).catch(cb);
    return;
  }

  return p.then(() => pkgs);
};
