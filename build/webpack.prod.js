
const common = require('./build/webpack.common.js/index.js');
const webpack = require('webpack');
const merge = require('webpack-merge');


module.exports = merge(common, {
  plugins: [
    // new webpack.optimize.UglifyJsPlugin()
  ],
  mode: 'production'
})