const path = require('path');
const webpack = require('webpack');
const config = require('webpack-config');
const autoprefixer = require('autoprefixer');

module.exports = new config.default().extend('webpack/webpack.base.config.js').merge({
  devtool: 'eval',
  output: {
    pathinfo: true,
  },  
  module: {
    rules: [
      {
        test: /\.css/,
        use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=2',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  autoprefixer({browsers: ['last 2 versions']}),
                ];
              },
            },
          },
          'stylus-loader',
        ],
      },
      {
        test: /\.pug$/,
        use: [{
          loader: 'pug-loader',
          options: {
            pretty: true
          }
        }, ]
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2|gif)$/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    inline: true,
    hot: true,
    contentBase: 'dist',
    port: process.env.PORT
  }
})