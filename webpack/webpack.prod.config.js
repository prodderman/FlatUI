/*global __dirname:true*/

const path = require('path');
const webpack = require('webpack');
const config = require('webpack-config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = new config.default().extend('webpack/webpack.base.config.js').merge({
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: false,
                minimize: true
              },
            },
            
          ],
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: false,
                minimize: true
              },
            },
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
        }),
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-0']
            }
          },
          {
            loader: 'pug-loader',
            options: {
              pretty: false
            }
          }  
        ],
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0']
          }
        },
        exclude: [
          /node_modules/,
          path.resolve(__dirname, 'src/vendors/'),
        ]
      },
      {
        test: /\.(svg|png|ico|xml|json|webmanifest)$/,
        loader: 'file-loader',
        include: [
          path.resolve(__dirname, '..', 'src/global/favicons')
        ],
        options: {
          name: 'favicons/[name].[ext]'
        }
      },
      {
        test: /\.(ico|png|jpg|svg|gif)$/,
        loader: 'file-loader',
        exclude: [
          /fonts/,
          path.resolve(__dirname, '..', 'src/global/favicons')
        ],
        options: {
          name: 'img/[name].[ext]'
        }
      },
      {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        exclude: [
          /node_modules/,
          /img/,
          path.resolve(__dirname, '..', 'src/global/favicons')
        ],
        options: {
          name: 'fonts/[name]/[name].[ext]',
          prefix: 'font'
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      mangle: true,
      output: {
        comments: false
      },
      compress: {
        sequences     : true,
        booleans      : true,
        loops         : true,
        unused      : true,
        warnings    : false,
        drop_console: true,
        unsafe      : true
      }
    }),
    new ExtractTextPlugin({
      filename: '[name]-[contenthash].css',
      allChunks: true,
    }),
  ],
});
