const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'none',
    devtool: 'cheap-module-source-map',
    entry: __dirname + '/src/js/main.js',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [{
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: true,
                            minimize: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [{
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: true,
                            minimize: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ],
                exclude: /node_modules/
            }
            
        ]
    },
    optimization: {},
    plugins: [
        new CleanWebpackPlugin(['./build']),
        new webpack.BannerPlugin("Author:Zzuzsj. Thanks for your reading."), //顶部版权实例
        new HtmlWebpackPlugin({ //启动模板实例
            template: __dirname + '/src/index.tmpl.html'
        }),
        new webpack.HotModuleReplacementPlugin() //热加载插件
    ]
}