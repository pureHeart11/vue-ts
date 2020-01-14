const webpackConfig = require('./webpack.config')
const WebpackMerge = require('webpack-merge')
// const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝静态资源
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin') //优化压缩
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //分析打包后的文件

module.exports = WebpackMerge(webpackConfig, {
    mode: 'production',
    devtool: '#source-map',
    optimization: {
        minimizer: [
            // new UglifyJsPlugin({//压缩js
            //     cache: true,
            //     parallel: true,
            //     sourceMap: true
            // }),
            new ParallelUglifyPlugin({
                cache: '.cache/',
                uglifyJS: {
                    output: {
                        output: {
                            comments: false,
                            beautify: false
                        },
                        compress: {
                            drop_console: true,
                            collapse_vars: true,
                            reduce_vars: true
                        }
                    }
                }
            }),
            new OptimizeCssAssetsPlugin({})
        ],
        splitChunks: {
            chunks: "async",
            cacheGroups: {
                commons: {
                    test: /main/,
                    priority: 11
                },
                vendors: {
                    test: /node_modules/,
                    priority: 10
                },
                vue: {
                    chunks: "initial",
                    test: /vue/,
                    name: "vue",
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 0,
                    reuseExistingChunk: true
                },
                vueRouter: {
                    chunks: "initial",
                    test: /vue-router/,
                    name: "vue-router",
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 1,
                    reuseExistingChunk: true
                },
                ElementUI: {
                    chunks: "initial",
                    test: /element-ui/,
                    name: "element-ui",
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 2,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new BundleAnalyzerPlugin(
            {
                analyzerMode: 'server',
                analyzerHost: '127.0.0.1',
                analyzerPort: 8889,
                reportFilename: 'report.html',
                defaultSizes: 'parsed',
                openAnalyzer: true,
                generateStatsFile: false,
                statsFilename: 'stats.json',
                statsOptions: null,
                logLevel: 'info'
            }
        ),
    ]
})