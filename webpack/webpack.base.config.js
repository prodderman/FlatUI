const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const config = require('webpack-config');
const CleanPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const pages = [];

fs
  .readdirSync(path.resolve(__dirname, '..', 'src', 'pages'))
  .forEach((file) => {
    pages.push(file);
  });

const htmls = pages.map(fileName => new HtmlWebpackPlugin({
  filename: `${fileName}.html`,
  template: `./src/pages/${fileName}/${fileName}.pug`,
  alwaysWriteToDisk: true,
  inject: 'body',
  hash: true,
}));

module.exports = new config.default().merge({
  entry: './src/entry.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist'),
  },

  resolve: {
    modules: [
      'node_modules',
      'src',
      path.resolve(__dirname, 'vendors'),
    ],
    alias: {
      vendors: path.resolve(__dirname, '..', 'src', 'vendors')
    }
  },
  plugins: [
    new CleanPlugin(['./dist'], { root: path.resolve(__dirname, '..') }),
    new webpack.ProgressPlugin(),
    new FaviconsWebpackPlugin('./src/global/favicon.png'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new HtmlWebpackHarddiskPlugin(),
  ].concat(htmls),
});