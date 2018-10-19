module.exports = {
    devtool:'eval-source-map',
    entry:__dirname + '/src/js/main.js',
    output:{
        path:__dirname +'/build',
        filename:'bundle.js'
    },
    devServer:{
        contentBase:'./build',
        historyApiFallback:true,
        inline:true
    }
}