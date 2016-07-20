'use strict';

var _ = require('lodash'),
    webpack = require('webpack');

console.log('-Running Sanbox-');

module.exports = {
  devServer: {
    contentBase: 'app/public',
    hot: true
  },
  context: __dirname,
  node: {
    process: true
  },
  devtool: 'inline-sourcemap',
  entry: [
    './app/public/stylesheet.css',
    './app/index.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080'
  ],
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
