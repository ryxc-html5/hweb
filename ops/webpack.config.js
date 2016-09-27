/**
 * Created by yangfei on 2016/7/6.
 */
var webpack = require('webpack');
var path = require('path');
var ExtractPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var exec = require('child_process').exec;

// var ChangeUrl = require('rel-to-abs');

var prd = process.env.NODE_ENV === 'production';

// 为了对比上次更新
var fs = require('fs');

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: 2
    })
];
//初始化基础数据
if(prd) {
    console.log('start prd process...');
    // args.publicPath = '/Public/' + htmlDir + '/assets/';
    // args.path = htmlDir + '/assets/output/assets';
    plugins = plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            // mangle: true,
            compress: {
                warnings: false, // Suppress uglification warnings
            },
        }),
        new ChangeUrl(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"prd"'
            }
        }),
        new CleanWebpackPlugin(['assets'], {
            root: 'F:\\web',
            verbose: true,
            dry: false
        }),
        function() {
            this.plugin("done", function(stat) {
                // 每个chunk的hash值，将来可用于增量修改压缩包
                // stat.compilation.chunks.forEach((c) => {
                //   console.log(c.hash);
                // })

                console.log('\n\n开始压缩..............\n');
                // exec('7z a -tzip ' + stat.hash.slice(0, 10) + '.zip assets\\*.js assets\\*.html css\\*.css', function() {
                //     console.log('\n结束压缩!!\n');
                // });
            });
        }
    ]);
}

var config = {
    context: __dirname,
    entry: {
        app:'./js/app',
        vendor: ['vue']
    },
    output: {
        publicPath: prd ? './' : './assets/',
        path: path.resolve(__dirname,'assets'),
        filename: '[name].js'//prd ? '[name]-[hash:6].js' : '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                include: [
                    path.resolve(__dirname, 'js'),
                    path.resolve(__dirname, '../common/js'),
                    path.resolve(__dirname, '../common/util')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.scss/,
                loader: ExtractPlugin.extract('style', 'css!sass')
            },
            {
                test: /\.css/,
                loader: "style-loader!css-loader"
            },
            {
                test:   /\.html/,
                loader: 'html'
            },
            {
                test:    /\.jade$/,
                loader: 'jade'
            },
            {
                test:    /\.vue$/,
                loader: 'vue'
            },
            {
                test:   /\.(png|gif|jpe?g|svg)$/i,
                loader: 'url?limit=8192&name=imgs/[name][hash:6].[ext]'
            },
            //
            {
                test: require.resolve('jquery'),
                loader: 'expose?jQuery'
            }
        ]
    },
    babel: {
        presets: ['stage-2', 'es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        root: [
            path.resolve('./util'),
            path.resolve('./common')
        ],
        extensions: ['', '.js', '.jsx', '.vue']
    },
    devServer: {
        stats: {
            children: false,
            chunks: false
        }
    },
    externals: {
        //"jquery": "jQuery",
        //"$": "jQuery"
    },
    plugins: plugins,
    devtool: prd ? false : 'source-map'
};

// 替换图片地址为域名地址正则
var srcReg = /\.exports=((\w|\.)+)(\+"[^}]+.(?:jpg|png|jpeg|gif))"/g;



module.exports = config;