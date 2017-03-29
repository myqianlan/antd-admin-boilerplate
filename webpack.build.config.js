var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// html-webpack-plugin插件，webpack中生成HTML的插件，
// 具体可以去这里查看https://www.npmjs.com/package/html-webpack-plugin
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require("path")

console.log('BUILD_ENV >>>', process.env.BUILD_ENV)

var BUILD_ENV = process.env.BUILD_ENV

var PUBLIC_PATH = {
    'dev': 'http://dev.yourhost.com/antd-admin/',
    'test': 'http://test.yourhost.com/antd-admin/',
    'prod': 'http://myqianlan.com/antd-admin-boilerplate/dist/',
}

var webpackConfig = {
    /*
     * 指定node_modules目录, 如果项目中存在多个node_modules时,这个很重要.
     * import js或者jsx文件时，可以忽略后缀名
     * */
    resolve: {
        modulesDirectories: ['node_modules', './node_modules'],
        extensions: ['', '.js', '.jsx'],
        unsafeCache: true,
        alias: {
            'component': path.resolve(__dirname, './src/component'),
            'common': path.resolve(__dirname, './src/common'),
            'framework': path.resolve(__dirname, './src/framework')
        }
    },
    resolveLoader: {
        modulesDirectories: ['node_modules', './node_modules']
    },

    entry: {
        index: './src/entry/index.jsx',
        vendor: ['jquery', 'moment', 'classnames', 'react', 'react-dom', 'react-router', 'antd']
    },
    cache: true,
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: PUBLIC_PATH[BUILD_ENV],
        filename: '[name].[chunkHash:8].js',
        chunkFilename: "[name].[chunkHash:8].js",
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel',
            }, {
                test: /\.css$/,
                // loader: 'style-loader!css-loader!postcss-loader',
                loader: ExtractTextPlugin.extract(['css', 'postcss'])
            }, {
                test: /\.scss$/,
                // loader: 'style-loader!css-loader!postcss-loader!sass-loader',
                loader: ExtractTextPlugin.extract(['css', 'postcss', 'sass'])
            }, {
                test: /\.less$/,
                // loader: 'style-loader!css-loader!postcss-loader!less-loader',
                loader: ExtractTextPlugin.extract(['css', 'postcss', 'less'])
            }, {
                test: /\.(png|jpg|jpeg|gif)$/i,
                loader: 'url?name=[hash:8].[ext]&limit=8192',
            }, {
                //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
                //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
                test: /\.html$/,
                loader: "html?attrs=img:src img:data-src"
            }, {
                //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            }, {
                test: /\.json$/,
                loader: 'json'
            }

        ]
    },
    postcss: [
        autoprefixer({browsers: ['last 3 versions', 'ie >= 9',]})
    ],
    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'windows.jQuery': 'jquery',
        }),
        new ExtractTextPlugin('[name].[contenthash:8].css', {
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
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
            externalsAssets: {}
        })
    ]
}

module.exports = webpackConfig
