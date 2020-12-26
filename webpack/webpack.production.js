const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const webpack = require('webpack');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const IgnorePlugin = webpack.IgnorePlugin;

const DIST_PATH =  path.resolve(__dirname, '..', 'dist'); 
const SRC_PATH = path.resolve(__dirname, '..', 'src');

// Bundling popup
const popupBundleConfig = merge(common, {
  mode: 'production',
  entry: {
    popup: path.join(SRC_PATH, 'popup/index.js'),
  },
  output: {
    filename: '[name]/index.js',
    path: DIST_PATH
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup/index.html',
      chunks: ['popup']
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/icons', to: 'icons' },
        { from: 'src/manifest.json', to: 'manifest.json' }
      ]
    })
  ]
});

// Bundling scripts
const scriptsBundleConfig = merge(common, {
  mode: 'production',
  entry: {
    background: path.join(SRC_PATH, 'scripts/background.js'),
    inject: path.join(SRC_PATH, 'scripts/inject.js'),
    ['occ-debugger']: path.join(SRC_PATH, 'scripts/occ-debugger.js')
  },
  output: {
    filename: 'scripts/[name].js',
    path: DIST_PATH
  }
});

module.exports = [
  popupBundleConfig,
  scriptsBundleConfig
];