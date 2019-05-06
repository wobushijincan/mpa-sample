
const webpack = require('webpack');
const common = require('./webpack.common');
const merge = require('webpack-merge');


module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: 'dist',
    port:3000
  },
  mode: 'development'
})