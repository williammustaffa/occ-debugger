const path = require('path');
const { extendCommonPlugins } = require('./plugins');

function createPureBundle({ input, format = 'iife', plugins }) {
  const pathInput = path.join('src', input);
  const pathOutput = path.join('dist', input);

  return {
    input: pathInput,
    output: {
      file: pathOutput,
      format,
    },
    plugins,
  };
}

function createCommonBundle({ input, plugins = [] }) {
  return createPureBundle({ input, plugins: extendCommonPlugins(plugins) });
};

module.exports = {
  createPureBundle,
  createCommonBundle,
};
