const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    popup: './src/popup/index.js',
  },
  output: {
    filename: '[name]/index.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-transform-react-jsx", { "pragma": "h" }]
            ]
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup/index.html',
      chunks: ['popup']
    })
  ]
};