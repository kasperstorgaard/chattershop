'use strict';
/* global __dirname module require*/
/* eslint comma-dangle: ["error", "never"] */
const path = require('path');

module.exports = {
  entry: './src/pm-app.html',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: 'dist/'
  },
  resolve: {
    modules: ['node_modules', 'bower_components'],
    descriptionFiles: ['package.json']
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          { loader: 'awesome-typescript-loader' },
          { loader: 'polymer-webpack-loader' }
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules\//,
        use: [
          { loader: 'awesome-typescript-loader' }
        ]
      }
    ]
  }
};