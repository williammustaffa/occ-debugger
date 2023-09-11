const path = require('path');
const { isProduction } = require('./utils');

// plugins
const { babel } = require('@rollup/plugin-babel');
const alias = require('@rollup/plugin-alias');
const resolve = require('@rollup/plugin-node-resolve');
const json = require('@rollup/plugin-json');
const commonjs = require('@rollup/plugin-commonjs')
const replace = require('rollup-plugin-replace');
const terser = require('@rollup/plugin-terser');

const plugins = [
  alias({
    entries: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      '@api': path.resolve(__dirname, '../src/api'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@contexts': path.resolve(__dirname, '../src/contexts'),
      '@assets': path.resolve(__dirname, '../src/assets')
    },
  }),
  resolve({ browser: true }),
  json(),
  commonjs({ include: 'node_modules/**' }),
  babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
  replace({ 'process.env.NODE_ENV': JSON.stringify( 'production' ) })
];

if (isProduction()) {
  plugins.push(terser())
}


module.exports = plugins;