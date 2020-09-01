let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 多入口
    entry: {
        home: './src/index.js',
        other: './src/other.js'
    },
    output: {
        // [name] home other
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    },
    // source-map 增加映射文件，帮助调试源代码
    // eval-source-map 不会产生文件，但是可以显示行和列
    // cheap-module-source-map 不会产生列，但是是一个单独的映射文件
    // eval-cheap-module-source-map 不会产生文件，集成在打包后的文件中【也不会产生列】
    devtool: '',
    node: {
        fs: 'empty'
    },
    mode: 'development',
    watch: true,
    watchOptions: {
        poll: 100, // 每秒询问次数
        aggregateTimeout: 1000, // 防抖
        ignored: /node_modules/ // 不需要监控那个文件
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'home.html',
            inject: true,
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'other.html',
            inject: true,
        })
    ]
}