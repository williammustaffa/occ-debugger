const { mergeWithCustomize } = require('webpack-merge');
const { uniq, merge } = require('lodash');
const path = require('path');
const pkg = require('../package.json');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DIST_PATH =  path.resolve(__dirname, '..', 'dist');
const SRC_PATH = path.resolve(__dirname, '..', 'src');

// Replace version in manifest json
const setManifestVersion = content => {
  return content.toString().replace(/__version__/g, pkg.version);
}

const configs = {
  entry: {
    'views/devtools/index': path.join(SRC_PATH, 'views/devtools/index.js'),
    'views/popup/index': path.join(SRC_PATH, 'views/popup/index.js'),
    'scripts/background': path.join(SRC_PATH, 'scripts/background.js'),
    'scripts/contentScript': path.join(SRC_PATH, 'scripts/contentScript.js'),
    'scripts/occDebugger': path.join(SRC_PATH, 'scripts/occDebugger.js')
  },
  output: {
    filename: '[name].js',
    path: DIST_PATH
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: {
          limit: 100000,
          name: '/assets/fonts/[name].[ext]',
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      cache: false,
      title: "OCC Debugger - Popup",
      filename: 'views/popup/index.html',
      chunks: ['views/popup/index']
    }),
    new HtmlWebpackPlugin({
      cache: false,
      title: "OCC Debugger - Devtools",
      filename: 'views/devtools/index.html',
      chunks: ['views/devtools/index']
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/icons', to: 'assets/icons' },
        { from: 'src/manifest.json', to: 'manifest.json', transform: setManifestVersion }
      ]
    })
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react': "preact/compat",
      'react-dom': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@contexts': path.resolve(__dirname, '../src/contexts'),
      '@assets': path.resolve(__dirname, '../src/assets')
    }
  }
};

module.exports = {
  configs,
  extend: data => {
    const customMerge = mergeWithCustomize({
      customizeArray: (a, b) => uniq([...a, ...b]),
      customizeObject: (a, b) => merge({}, a, b)
    });

    return customMerge(configs, data);
  }
};