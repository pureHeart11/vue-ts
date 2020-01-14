const Webpack = require('webpack')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const webpackConfig = require('./webpack.config')
const WebpackMerge = require('webpack-merge')
module.exports = WebpackMerge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 8088,
        hot: true,
        host: HOST,
        quiet: true,
        historyApiFallback: true,
        open: false,
        // overlay: {
        //     warnings: false, errors: true
        // }
        // contentBase: '../dist'
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://localhost:8088`],
            },
            // onErrors: function (severity, errors) {
            // },
        })
    ]
})
