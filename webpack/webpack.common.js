const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
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
        loader: 'url-loader',
        options: {
          limit: 100000
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
      'utils': path.resolve(__dirname, '../src/utils')
    }
  },
  plugins: []
};