'use strict';

var _ = require('lodash'),
    webpack = require('webpack');

var $ = process.env;

var debug = $.NODE_ENV !== 'production';
if (debug) console.log('-Running dev build-');

module.exports = {
  devServer: {
    contentBase: 'app/public',
    historyApiFallback: true,
    hot: true
  },
  context: __dirname,
  node: {
    process: true
  },
  devtool: debug ? 'inline-sourcemap' : null,
  entry: debug ? [
    './app/public/stylesheet.css',
    './app/index.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080'
  ] : './app/index.js',
  output: {
    path: './app/public',
    publicPath: '/',
    filename: 'scripts.min.js'
  },
  module: {
    preLoaders: [{
      test:    /\.js$/,
      exclude: /node_modules/,
      loader: 'jshint-loader'
    }, {
      test:    /\.js$/,
      exclude: /node_modules/,
      loader: 'jscs-loader'
    }],
    loaders: _.flatten([
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?presets[]=react']
      },
      [{
        test: /\.json$/,
        loader: 'json'
      }],
      [{
        test:   /\.css$/,
        loader: 'style-loader!css-loader'
      }]
    ])
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      'node_modules',
      'app',
      'lib'
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
