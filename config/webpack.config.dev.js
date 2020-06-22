'use strict';

const webpack              = require('webpack')
const merge                = require('webpack-merge')
const helpers              = require('./helpers')
const commonConfig         = require('./webpack.config.common')
const environment          = require('./env/dev.env')

const webpackConfig = merge(commonConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[id].chunk.js'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new webpack.EnvironmentPlugin(environment),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        compress: true,
        historyApiFallback: true,
        hot: true,
        open: true,
        overlay: true,
        port: 8000,
        stats: {
            colors: true,
            'errors-warnings': true,
            assets: false,
            builtAt: false,
            children: false,
            chunks: false,
            hash: false,
            logging: 'warn',
            publicPath: false,
            version: false,
            chunkModules: false,
            chunkRootModules: false,
            modules: false,
            timings: false,
            entrypoints: false,
            usedExports: true
        }
    }
})

module.exports = webpackConfig