'use strict';

require('mocha');
const assert = require('assert');
const get = require('./');

describe('getPackages', () => {
  it('should get the package.json for the given repo', cb => {
    get('generate', (err, pkgs) => {
      if (err) return cb(err);
      assert(pkgs[0].hasOwnProperty('name', 'generate'));
      cb();
    });
  });

  it('should not error on non-existing repos', cb => {
    get('fofofof', (err, pkgs) => {
      assert(err);
      assert.equal(typeof pkgs, 'undefined');
      cb();
    });
  });

  it('should handle errors when one repo in an array does not exist', cb => {
    get(['fofofof', 'assemble'], (err, pkgs) => {
      assert(err);
      assert.equal(typeof pkgs, 'undefined');
      cb();
    });
  });

  it('should continue when a repo does not exist', cb => {
    get(['fofofof', 'assemble'], { silent: true }, (err, pkgs) => {
      assert.equal(pkgs.length, 1);
      cb();
    });
  });

  it('should get package.json files for an array of repos', cb => {
    get(['assemble', 'verb'], (err, pkgs) => {
      if (err) return cb(err);
      assert(pkgs[0].hasOwnProperty('name', 'assemble'));
      assert(pkgs[1].hasOwnProperty('name', 'verb'));
      cb();
    });
  });

  it('should return a promise', () => {
    return get(['assemble', 'verb']).then(pkgs => {
      assert(pkgs[0].hasOwnProperty('name', 'assemble'));
      assert(pkgs[1].hasOwnProperty('name', 'verb'));
    });
  });
});
