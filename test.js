'use strict';

require('mocha');
const assert = require('assert');
const get = require('./');

describe('getPackages', function() {
  it('should get the package.json for the given repo', function(cb) {
    get('generate', function(err, pkgs) {
      if (err) return cb(err);
      assert(pkgs[0].hasOwnProperty('name', 'generate'));
      cb();
    });
  });

  it('should not error on non-existing repos', function(cb) {
    get('fofofof', function(err, pkgs) {
      assert(err);
      assert.equal(typeof pkgs, 'undefined');
      cb();
    });
  });

  it('should handle errors when one repo in an array does not exist', function(cb) {
    get(['fofofof', 'assemble'], function(err, pkgs) {
      assert(err);
      assert.equal(typeof pkgs, 'undefined');
      cb();
    });
  });

  it('should continue when a repo does not exist', function(cb) {
    get(['fofofof', 'assemble'], {silent: true}, function(err, pkgs) {
      assert.equal(pkgs.length, 1);
      cb();
    });
  });

  it('should get package.json files for an array of repos', function(cb) {
    get(['assemble', 'verb'], function(err, pkgs) {
      if (err) return cb(err);
      assert(pkgs[0].hasOwnProperty('name', 'assemble'));
      assert(pkgs[1].hasOwnProperty('name', 'verb'));
      cb();
    });
  });

  it('should return a promise', function() {
    return get(['assemble', 'verb'])
      .then(pkgs => {
        assert(pkgs[0].hasOwnProperty('name', 'assemble'));
        assert(pkgs[1].hasOwnProperty('name', 'verb'));
      });
  });
});
