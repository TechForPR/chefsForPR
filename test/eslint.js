const lint = require('mocha-eslint');

const expect = require('chai').expect; // eslint-disable-line no-unused-vars

describe('Code must pass Eslint validation', () => {
  lint([
    'index.js',
    'test/**/*.js',
    'routes/**/*.js',
    'config/**/*.js',
    'models/**/*.js',
  ], {});
});
