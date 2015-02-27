/*!
 * get-pkgs <https://github.com/jonschlinkert/get-pkgs>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var should = require('should');
var get = require('./');

describe('getPackages', function () {
  it('should get package.json files for a list of projects:', function (done) {
    get(['assemble', 'verb'], function(err, pkgs) {
      pkgs[0].should.have.property('name', 'assemble');
      pkgs[1].should.have.property('name', 'verb');
      done();
    });
  });

  it('should filter properties:', function (done) {
    get(['assemble', 'verb'], '!_*', function(err, pkgs) {
      pkgs[0].should.not.have.property('_shasum');
      pkgs[1].should.not.have.property('_shasum');
      done();
    });
  });
});
