
const common = require('./webpack.common');
const webpack = require('webpack');
const merge = require('webpack-merge');


var allConfig = merge(common, {
  plugins: [
    // new webpack.optimize.UglifyJsPlugin()
  ],
  mode: 'production'
})


module.exports = allConfig;