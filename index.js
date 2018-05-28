/*!
 * get-pkgs <https://github.com/jonschlinkert/get-pkgs>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const pkg = require('get-pkg');

module.exports = function get(names, options = {}, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (typeof names === 'string') {
    names = [names];
  }

  const pending = [];
  const pkgs = [];

  for (const name of names) {
    const promise = pkg(name)
      .then(res => {
        if (res) pkgs.push(res);
      })
      .catch(err => {
        if (err.message === 'document not found' && options.silent) return;
        return Promise.reject(err);
      });

    pending.push(promise);
  }

  const promise = Promise.all(pending);

  if (typeof cb === 'function') {
    promise.then(() => cb(null, pkgs)).catch(cb);
    return;
  }

  return promise.then(() => pkgs);
};
