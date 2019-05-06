
const getWebpackConfig = require('./webpack.common');
const merge = require('webpack-merge');


module.exports = merge(getWebpackConfig('development'), {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: 'dist',
    port:3000
  },
  mode: 'development'
})