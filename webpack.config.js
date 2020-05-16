const path = require('path')
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')  // 这里必须这样引入，不然报错，原写法改了，坑！

module.exports = {
    entry: {
        index: './src/index.js',
        global: './src/global.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['index'], //添加引入的js,也就是entry中的key
            template: './src/html/index.html',
            // minify: {
            //     collapseWhitespace: true //折叠空白区域 也就是压缩代码
            // },
            hash: true,
            title: '全国疫情实时数据报告',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['global'], //添加引入的js,也就是entry中的key
            template: './src/html/global.html',
            // minify: {
            //     collapseWhitespace: true //折叠空白区域 也就是压缩代码
            // },
            hash: true,
            title: '全球疫情实时数据报告',
            filename: 'global.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: './img'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: './fonts'
                    }
                }]
            }
        ]
    },
    devServer: {
        open: true,
        port: 8000,
        contentBase: 'src',
        hot: true
    },
    mode: 'development',
    performance: {
        hints: false
    }
}
