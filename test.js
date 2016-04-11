/*!
 * get-pkgs <https://github.com/jonschlinkert/get-pkgs>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
require('mocha');
var assert = require('assert');
var get = require('./');

describe('getPackages', function() {
  it('should get the package.json for the given repo', function(cb) {
    get('generate', function(err, pkgs) {
      if (err) return cb(err);
      pkgs[0].should.have.property('name', 'generate');
      cb();
    });
  });

  it('should not error on non-existing repos', function(cb) {
    get('fofofof', function(err, pkgs) {
      assert(!err);
      assert.equal(pkgs.length, 0);
      cb();
    });
  });

  it('should get package.json files for an array of repos', function(cb) {
    get(['assemble', 'verb'], function(err, pkgs) {
      if (err) return cb(err);
      pkgs[0].should.have.property('name', 'assemble');
      pkgs[1].should.have.property('name', 'verb');
      cb();
    });
  });
});
