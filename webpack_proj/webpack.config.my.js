const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 抽离css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// css压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// js压缩
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

// postcss-loader autoprefixer
// mini-css-extract-plugin
// es6转化 babel-loader @babel/core @babel/preset-env

// expose-loader 暴露变量为全局的loader
// pre 前面执行的loader normal 普通loader 内联loader 后置 postloader
//

// webpack是node写出来的 node的写法
module.exports = {
    // 优化项
    optimization: {
        minimizer: [
            new UglifyjsWebpackPlugin({
                cache: true,
                parallel: true, // 并发打包
                sourceMap: true, // 压缩完源码映射
            }),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    mode: 'development', // 默认两种 production development
    entry: './src/index.js', // 入口
    output: {
        filename: 'bundle.[hash:6].js', // 打包后的文件名
        path: path.resolve(__dirname,'build') // 绝对路径
    },
    devServer: { // 开发服务器的配置
        contentBase: path.join(__dirname, "build"),
        port: 5000,
        compress: true,
        progress: true,
        host:'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            // minify: {
            //     removeAttributeQuotes: true,
            //     collapseInlineTagWhitespace: true,
            // },
            // hash: true
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ],
    module: { // 模块
        // loader
        rules: [
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: { // 用babel-loader 需把ES6转化成ES5
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            },
            // 规则 css-loader 连续 @import这种语法
            // style-loader 把css插到head的标签中
            // loader 特点单一
            // loader用法
            // 多个loader需要数组[]
            // loader的顺序，默认是从右向左执行
            // loader还可以写成对象形式
            {
                test: /\.css$/,
                use: [
                    // {
                    //     loader: 'style-loader'
                    // },
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // {
                    //     loader: 'style-loader'
                    // },
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader', // sass node-sass sass-loader stylus stylus-loader
                ]
            }
        ]
    }
}