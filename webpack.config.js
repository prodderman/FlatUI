const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const hwp = require('html-webpack-plugin');
const hwhp = require('html-webpack-harddisk-plugin');
const config = require('webpack-config');
const CleanPlugin = require('clean-webpack-plugin');

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
  chunks: [`${fileName}`, 'common'],
  template: `./src/pages/${fileName}/${fileName}.pug`,
  alwaysWriteToDisk: true
}));

const entries = pages.reduce((entry, fileName) => {
  entry[fileName] = `./src/pages/${fileName}/${fileName}.js`;
  return entry;
}, {});

module.exports = new config.default().merge({
  entry: entries,
  output: {
    path: paths.dist,
    filename: "js/[name].js"
  },

  module: {
    noParse: function (content) {
      return /jquery|lodash/.test(content);
    },
  },

  resolve: {
    modules: [
      'src',
      path.resolve(__dirname, "vendors"),
      'node_modules'
    ]
  },

  plugins: [
    new CleanPlugin(['./dist'], { root: __dirname}),
    new webpack.ProgressPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    new hwhp({
      outputPath: path.resolve(__dirname, 'dist')
    })
  ].concat(htmls),


}).extend("webpack/webpack.[NODE_ENV].config.js");