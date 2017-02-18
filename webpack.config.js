'use strict';

var _ = require('lodash'),
    webpack = require('webpack');

var $ = process.env;

var env = $.NODE_ENV || 'development';
console.log('Webpack:', env);

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
  devtool: {
    development: 'inline-sourcemap',
    production: null,
    test: 'inline-sourcemap'
  }[env],
  entry: {
    development: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './app/public/stylesheet.css',
      './app/index.js'
    ],
    production: './app/index.js',
    test: './app/index.js'
  }[env],
  output: {
    path: env === 'test' ? './app/test_public' : './app/public',
    publicPath: '/',
    filename: 'scripts.min.js'
  },
  module: {
    preLoaders: {
      development: [{
        test:    /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'
      }, {
        test:    /\.js$/,
        exclude: /node_modules/,
        loader: 'jscs-loader'
      }],
      production: [],
      test: []
    }[env],
    loaders: _.flatten([
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: {
          development: ['react-hot-loader/webpack', 'babel?presets[]=react'],
          production: ['babel?presets[]=react'],
          test: ['babel?presets[]=react']
        }[env]
      },
      [{
        test: /\.json$/,
        loader: 'json'
      }],
      {
        development: [{
          test:   /\.css$/,
          loader: 'style-loader!css-loader'
        }],
        production: [],
        test: []
      }[env]
    ])
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      'node_modules',
      'app',
      'app/src',
      'lib'
    ]
  },
  plugins: {
    development: [new webpack.HotModuleReplacementPlugin()],
    production: [
      new webpack.DefinePlugin({'process.env': JSON.stringify(appVars)}),
      new webpack.optimize.UglifyJsPlugin({mangle: false}),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin()
    ],
    test: [
      new webpack.DefinePlugin({'process.env': JSON.stringify(appVars)})
    ]
  }[env]
};
