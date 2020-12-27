const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');

const DIST_PATH =  path.resolve(__dirname, '..', 'dist'); 
const SRC_PATH = path.resolve(__dirname, '..', 'src');

// Bundling popup
module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    'popup/index': path.join(SRC_PATH, 'popup/index.js'),
    'scripts/inject': path.join(SRC_PATH, 'scripts/inject.js'),
    'scripts/occ-debugger': path.join(SRC_PATH, 'scripts/occ-debugger.js')
  },
  output: {
    filename: '[name].js',
    path: DIST_PATH
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "OCC Debugger",
      filename: 'popup/index.html',
      template: 'src/popup/index.html',
      chunks: ['popup/index']
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/icons', to: 'icons' },
        { from: 'src/manifest.json', to: 'manifest.json' }
      ]
    }),
    new ExtensionReloader({
      port: 3000,
      reloadPage: true,
    }),
  ]
});