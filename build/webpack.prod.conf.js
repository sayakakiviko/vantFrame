/** @format */

'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// const env =
//   process.env.NODE_ENV === 'testing'
//     ? require('../config/test.env')
//     : require('../config/prod.env');

let webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': env
    // }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    new ExtractTextPlugin({
      filename: utils.assetsPath('styles/[name].[contenthash].css'),
      allChunks: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // copy version
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../version'),
        to: '../',
        toType: 'dir'
      }
    ]),
    // copy version
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../related')
      }
    ]),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        // 指定范围是js文件来自node_modules
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        );
      }
    })
  ]
});

//添加webpack html plugin
webpackConfig = utils.addHTMLPlugin(webpackConfig);

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
