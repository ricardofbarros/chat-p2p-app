/* eslint strict: 0 */
'use strict'

var webpack = require('webpack')
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer')
var baseConfig = require('./webpack.config.base')

var config = Object.create(baseConfig)

config.debug = true

config.devtool = 'cheap-module-eval-source-map'

config.entry = [
  'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
  './app/index'
]

config.output.publicPath = 'http://localhost:3000/dist/'

config.module.loaders.push({
  test: /^((?!\.module).)*\.css$/,
  loaders: [
    'style-loader',
    'css-loader'
  ]
}, {
  test: /\.module\.css$/,
  loaders: [
    'style-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!'
  ]
})

config.module.loaders.push(
  { test: /\.woff.?/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
  { test: /\.ttf/, loader: 'file-loader' },
  { test: /\.eot/, loader: 'file-loader' },
  { test: /\.svg/, loader: 'file-loader' },
  { test: /\.png$/, loader: 'url-loader?limit=100000' },
  { test: /\.jpg$/, loader: 'file-loader' }
)

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    '__DEV__': true,
    'process.env': {
      'NODE_ENV': JSON.stringify('development')
    }
  })
)

config.target = webpackTargetElectronRenderer(config)

module.exports = config
