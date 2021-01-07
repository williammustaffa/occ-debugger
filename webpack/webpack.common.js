const { mergeWithCustomize } = require('webpack-merge');
const { uniq, merge } = require('lodash');
const path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const DIST_PATH =  path.resolve(__dirname, '..', 'dist');
const SRC_PATH = path.resolve(__dirname, '..', 'src');

const configs = {
  entry: {
    'views/devtools/index': path.join(SRC_PATH, 'views/devtools/index.js'),
    'views/popup/index': path.join(SRC_PATH, 'views/popup/index.js'),
    'scripts/inject': path.join(SRC_PATH, 'scripts/inject.js'),
    'scripts/occ-debugger': path.join(SRC_PATH, 'scripts/occ-debugger.js')
  },
  output: {
    filename: '[name].js',
    path: DIST_PATH
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      cache: false,
      title: "OCC Debugger",
      filename: 'views/popup/index.html',
      template: 'src/views/popup/index.html',
      chunks: ['views/popup/index']
    }),
    new HtmlWebpackPlugin({
      cache: false,
      title: "OCC Debugger - Devtools",
      filename: 'views/devtools/index.html',
      template: 'src/views/devtools/index.html',
      chunks: ['views/devtools/index']
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/icons', to: 'icons' },
        { from: 'src/manifest.json', to: 'manifest.json' }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  "useBuiltIns": "usage",
                  "corejs": 3,
                  "targets": "> 0.25%, not dead"
                }
              ]
            ],
            plugins: [
              ["@babel/plugin-transform-react-jsx", { "pragma": "h" }]
            ]
          }
        }
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: {
          limit: 100000,
          name: '[path][name].[ext]',
        }
      },
      {
        test: /\.(css|scss)$/i,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
        ],
      },
    ]
  },
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
      '@fonts': path.resolve(__dirname, '../src/fonts'),
      '@base-css': path.resolve(__dirname, '../src/base-css'),
    }
  }
};

module.exports = {
  configs,
  extend: data => {
    const merge = mergeWithCustomize({
      customizeArray: (a, b) => uniq([...a, ...b]),
      customizeObject: (a, b) => merge({}, a, b)
    });

    return merge(configs, data);
  }
};