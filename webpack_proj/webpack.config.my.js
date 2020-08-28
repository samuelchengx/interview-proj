const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack是node写出来的 node的写法
module.exports = {
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
            minify: {
                removeAttributeQuotes: true,
                collapseInlineTagWhitespace: true,
            },
            hash: true
        })
    ],
    module: { // 模块
        // loader
        // 规则 css-loader 连续 @import这种语法
        rules: [
            // style-loader 把css插到head的标签中
            // loader 特点单一
            // loader用法
            // 多个loader需要数组[]
            // loader的顺序，默认是从右向左执行
            // loader还可以写成对象形式
            {test: /\.css$/, use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insertAt: 'top'
                        }
                    },
                    'css-loader'
                ]
            },
        ]
    }
}