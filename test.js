/*!
 * get-pkgs <https://github.com/jonschlinkert/get-pkgs>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
require('mocha');
var get = require('./');

describe('getPackages', function () {
  it('should get the package.json for the given repo', function (cb) {
    get('generate', function(err, pkgs) {
      pkgs[0].should.have.property('name', 'generate');
      cb();
    });
  });

  it('should get package.json files for an array of repos', function (cb) {
    get(['assemble', 'verb'], function(err, pkgs) {
      pkgs[0].should.have.property('name', 'assemble');
      pkgs[1].should.have.property('name', 'verb');
      cb();
    });
  });
});
