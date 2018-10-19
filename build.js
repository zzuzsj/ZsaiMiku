const webpack = require('webpack');
const devConfig = require('./webpack.dev.config')
const prodConfig = require('./webpack.prod.config')
let env = process.argv[2];
let packConfig = env=="prod"?prodConfig:devConfig;
webpack(packConfig,(err,status)=>{
    if(err){
        console.log(err);
    }
})