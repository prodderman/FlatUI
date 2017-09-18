const path = require('path');
const webpack = require('webpack');
const config = require('webpack-config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = new config.default().extend("webpack/webpack.base.config.js").merge({
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '',
  },
  filename: __filename,
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
        test: /\.(ico|png|jpg|svg|gif)$/,
        loader: 'file-loader',
        exclude: [
          /fonts/
        ],
        options: {
          name: "img/[name].[ext]"
        }
      },
      {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        exclude: [
          /node_modules/,
          /img/
        ],
        options: {
          name: "fonts/[name]/[name].[ext]",
          prefix: "font"
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
      filename: "[name].css",
      allChunks: true,
    }),
  ],
})