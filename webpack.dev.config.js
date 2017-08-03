const path = require("path")
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const AutoDllPlugin = require('autodll-webpack-plugin')

// html-webpack-plugin插件，webpack中生成HTML的插件，
// 具体可以去这里查看https://www.npmjs.com/package/html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

let webpackConfig = {

    devtool: 'cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true,
        inline: true,
        port: 9090,
        // host: '192.168.30.216',
        compress: true,
        // https://webpack.github.io/docs/node.js-api.html
        // https://github.com/webpack/webpack/blob/master/lib/Stats.js#L50
        stats: {
            chunkModules: false,
            modules: false,
            error: true,
            errorDetails: true,
            publicPath: true
        },
        proxy: {
            '/api': {
                target: 'https://api.douban.com',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            },
            // '*': {
            //     target: 'https://api.douban.com',
            //     changeOrigin: true
            // }
        }
    },
    resolve: {
        modules: ['node_modules', './node_modules'],
        extensions: ['.js', '.jsx'],
        unsafeCache: true,
        alias: {
            'component': path.resolve(__dirname, './src/component'),
            'common': path.resolve(__dirname, './src/common'),
            'framework': path.resolve(__dirname, './src/framework')
        }
    },
    resolveLoader: {
        modules: ['node_modules', './node_modules']
    },

    entry: {
        index: './src/entry/index.jsx',
    },
    cache: true,
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: '[name].[chunkHash:8].js',
        chunkFilename: "[name].[chunkHash:8].js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ]
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            }, {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ]
            }, {
                test: /\.(png|jpg|jpeg|gif)$/i,
                loader: 'url-loader?name=[hash:8].[ext]&limit=8192',
            }, {
                //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
                //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
                test: /\.html$/,
                loader: "html-loader?attrs=img:src img:data-src"
            }, {
                //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            },

        ]
    },
    externals: {
        // 'react': 'React',
        // 'react-dom': 'ReactDOM',
        // 'react-router': 'ReactRouter'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"development"'
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'windows.jQuery': 'jquery',
        }),

        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: Infinity,
        }),
        // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            filename: './index.html', //生成的html存放路径，相对于path
            template: './src/entry/index.html.ejs', //html模板路径
            title: '管理台',
            favicon: './src/entry/bomb.ico',
            inject: true, //js插入的位置，true/'head'/'body'/false
            hash: false, //为静态资源生成hash值
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            },
            chunksSortMode: 'dependency',
            externalsAssets: {
                // react: '//cdn.bootcss.com/react/15.3.0/react.js',
                // reactDOM: '//cdn.bootcss.com/react/15.3.0/react-dom.js',
                // reactRouter: '//cdn.bootcss.com/react-router/2.6.1/ReactRouter.js'
            }
        }),
        new AutoDllPlugin({
            inject: true, // will inject the DLL bundle to index.html
            debug: true,
            filename: '[name].[hash:8].js',
            path: './dll',
            entry: {
                vendor: ['jquery', 'moment', 'classnames', 'react', 'react-dom', 'react-router', 'antd']
            }
        })
    ]
}

module.exports = webpackConfig
