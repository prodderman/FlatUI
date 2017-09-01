const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const hwp = require('html-webpack-plugin');
const hwhp = require('html-webpack-harddisk-plugin');
const config = require('webpack-config');
const CleanPlugin = require('clean-webpack-plugin');
const fwp = require('favicons-webpack-plugin');

const pages = [];

const paths = {
  pages: path.resolve(__dirname, 'src', 'pages'),
  dist: path.resolve(__dirname, "..", 'dist'),
};

fs
  .readdirSync(paths.pages)
  .forEach((file) => {
    pages.push(file);
  });

const htmls = pages.map(fileName => new hwp({
  filename: `${fileName}.html`,
  chunks: ['main'],
  template: `./src/pages/${fileName}/${fileName}.pug`,
  alwaysWriteToDisk: true,
  hash: false,
  favicon: './src/global/favicon.png',
  inject: 'body'
}));

const entries = pages.reduce((entry, fileName) => {
  entry[fileName] = `./src/pages/${fileName}/${fileName}.js`;
  return entry;
}, {});

module.exports = new config.default().merge({
  entry: './src/entry.js',
  output: {
    path: paths.dist,
    filename: "js/main.js",
    library: "main"
  },

  resolve: {
    modules: [
      'node_modules',
      'src',
      path.resolve(__dirname, "vendors"),
    ],
    alias: {
      vendors: path.resolve(__dirname, 'src/vendors/')
    }
  },

  plugins: [
    //new fwp('./src/global/favicon.png'),
    new CleanPlugin(['./dist'], {
      root: __dirname
    }),
    new webpack.ProgressPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery",
    }),
    new hwhp({
      outputPath: path.resolve(__dirname, 'dist')
    })
  ].concat(htmls),


}).extend("webpack/webpack.[NODE_ENV].config.js");