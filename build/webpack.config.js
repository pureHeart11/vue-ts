const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const HappyPack = require('happypack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const webpack = require("webpack");

function resolve(dir) {
    return path.resolve(__dirname, "../", dir)
}

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: {
        app: "./main/index.ts",
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js',
        // publicPath:'../'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': resolve('main'),
        }
    },
    // externals: {
    //     vue: 'Vue',
    //     VueRouter: 'VueRouter'
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: "main/template.html",
            filename: 'index.html',
            inject: true,
            // oss_path: 'http://gos-test.oss-cn-hangzhou.aliyuncs.com/base_boss',
            // bundleName: path.join(__dirname, "./static/js/vendor.dll.js")
            // bundleName: "./static/js/vendor.dll.j"
        }),
        new CleanWebpackPlugin(),
        new vueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css',
        }),
        new HappyPack({
            id: 'happyBabel',
            threadPool: happyThreadPool, //共享进程池
            loaders: ['babel-loader?presets[]=es2015']
        }),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: require('./vendor-manifest.json')
        // }),
        // new CopyWebpackPlugin([ // 拷贝生成的文件到dist目录 这样每次不必手动去cv
        //     { from: 'static/js', to: 'static/js' }
        // ])
    ],
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                            publicPath: '../'
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [resolve('main')]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                },
                include: [resolve('main')]
            },
            // {
            //     test: /\.ts$/,
            //     exclude: /node_modules/,
            //     enforce: 'pre',
            //     loader: 'tslint-loader'
            // },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.ext$/,
                use: [
                    'cache-loader',
                    'babel-loader'
                ],
                include: path.resolve('../main')
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //图片文件
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'img/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'media/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'fonts/[name].[hash:8].[ext]'
                }
            },
        ]
    }
}
