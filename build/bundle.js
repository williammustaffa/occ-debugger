const path = require('path');
const sharedPlugins = require('./plugins');
const { isProduction } =  require('./utils');

function createBundle({ input, plugins = [] }) {
  return {
    input: path.join('src', input),
    output: {
      file: path.join('dist', input),
      format: 'iife',
      sourcemap: !isProduction() ? 'inline' : false,
    },
    plugins: [
      ...sharedPlugins,
      ...plugins
    ],
  }
};

module.exports = {
  createBundle,
};
