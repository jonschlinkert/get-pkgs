/*!
 * get-pkgs <https://github.com/jonschlinkert/get-pkgs>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var pkgs = require('./');

describe('pkgs', function (done) {
  it('should get a package.json for the given module:', function (done) {
    pkgs('verb', function(err, pkg) {
      pkg[0].should.have.property('name', 'verb');
      done();
    });
  });

  it('should get a package.json for an array of modules:', function (done) {
    pkgs(['verb', 'assemble'], function(err, pkg) {
      pkg[0].should.have.property('name', 'verb');
      pkg[1].should.have.property('name', 'assemble');
      done();
    });
  });
});


