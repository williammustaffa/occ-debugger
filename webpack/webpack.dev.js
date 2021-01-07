const ExtensionReloader = require('webpack-extension-reloader');
const common = require('./webpack.common.js');

module.exports = common.extend({
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new ExtensionReloader({
      port: 3000,
      reloadPage: true
    }),
  ]
});