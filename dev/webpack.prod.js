
const getWebpackConfig = require('./webpack.common');
const merge = require('webpack-merge');


var allConfig = merge(getWebpackConfig('production'), {
  plugins: [
    // new webpack.optimize.UglifyJsPlugin()
  ],
  mode: 'production'
})


module.exports = allConfig;