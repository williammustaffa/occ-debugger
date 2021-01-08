const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = common.extend({
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
  ]
});