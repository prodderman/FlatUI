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
        test: /\.(png|jpg|svg|gif|ttf|eot|woff|woff2|xml|webmanifest)$/,
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