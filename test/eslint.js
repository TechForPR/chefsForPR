const lint = require('mocha-eslint');

describe('Code must pass Eslint validation', () => {
  lint([
    'index.js',
    'test/**/*.js',
    'routes/**/*.js',
    'config/**/*.js',
    'models/**/*.js',
  ], {});
});
