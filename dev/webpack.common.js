
const path = require('path');
const glob = require('glob');
const HappyPack = require('happypack');
const cleanWebpackPlugin = require('clean-webpack-plugin'); // build之前，清掉dist文件夹
const htmlWebpackPlugin = require('html-webpack-plugin'); // build中，定义生成的html文件模板
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 抽取单独的css到各自的css文件中
const webpack = require('webpack');
const copyPlugin = require('copy-webpack-plugin'); // 从指定的目录复制资源文件到指定的目录
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //提取css到单独文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css插件

// 循环得到所有子页面的js，以便生成多页面
function getEntry(globPath) {
  var files = glob.sync(globPath);
  let list = {};
  let gap = files[0].lastIndexOf('/');
  files.map(item => {
    var key = item.slice(gap + 1, item.length - 3)
    list[key] = './' + item;
  })
  return list;
}
var entries = getEntry('src/pages/*.js');
Object.assign(entries, {
  index: './src/index.js',
  // vendors: ['lodash', 'jquery']
})


function getWebpackConfig(modeType) {
  // process.env.NODE_ENV = modeType
  var config = {
    entry: entries,
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'js/[name]/[name].bundle.js',
      publicPath: modeType === 'production' ? '/dist/' : ''
    },
    module: {
      rules: [{
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: 'happypack/loader?id=css',
            publicPath: '../'
          }),
          exclude: /node_modules/
        },
        // {
        //   test: /\.css$/,
        //     use: [{
        //         loader: MiniCssExtractPlugin.loader,
        //         options: {
        //           // you can specify a publicPath here
        //           // by default it uses publicPath in webpackOptions.output
        //           // publicPath: 'assets/css',
        //           hmr: process.env.NODE_ENV === 'development',
        //         },
        //       },
        //       'css-loader',
        //     ],
        // },
        {
          test: /\.(png|jpg|svg|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: "[name].[ext]",
              outputPath: 'images',
              // publicPath: '/images/'
            }
          }],
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss', './json']
    },
    plugins: [
      new cleanWebpackPlugin(),
      // new htmlWebpackPlugin({
      //   title: 'Index Page',
      //   filename: 'index.html',
      //   inject: true,
      //   chunks: ['app', 'vendors']
      // }),
      // new htmlWebpackPlugin({
      //   title: 'new template',
      //   filename: 'pages/print.html',
      //   chunks: ['print','vendors']
      // }),
      new ExtractTextPlugin({
        filename: 'css/[name].css'
      }),
      // new copyPlugin([
      //   { from: 'assets/images', to: 'images'}
      // ]),
      new webpack.ProvidePlugin({
        '_': 'lodash',
        '$': 'jquery'
      }),
      // new MiniCssExtractPlugin({
      //   // Options similar to the same options in webpackOptions.output
      //   // both options are optional
      //   filename: 'css/[name].css',
      //   chunkFilename: '[id].css',
      // }),
      new OptimizeCssAssetsPlugin(),
      new HappyPack({
        id: 'css',
        threads: 4,
        loaders: ['css-loader']
      })
    ],
    optimization: {
      splitChunks: {
        // filename: 'vendors_test.js',
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  }

  Object.keys(entries).map(key => {
    config.plugins.push(
      new htmlWebpackPlugin({
        title: `new template is ${key}`,
        filename: key === 'index' ? `${key}.html` : `pages/${key}.html`,
        chunks: [key, 'vendors'],
        minify: {
          removeAttributeQuotes: true
        }
      })
    );
  })
  return config;
}

console.log(process.env.NODE_ENV);

module.exports = getWebpackConfig;