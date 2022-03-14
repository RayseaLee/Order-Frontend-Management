/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-07 14:43:17
 * @FilePath: \VScode\vue\vue-order-control\vue.config.js
 * @LastEditTime: 2022-01-21 14:32:41
 * @LastEditors: RayseaLee
 */
const path = require('path');//引入path模块
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
module.exports={
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('@',resolve('./src'))
        .set('components',resolve('./src/components'))
        .set('assets',resolve('./src/assets'))
        .set('common',resolve('./src/common'))
        .set('api',resolve('./src/api'))
        .set('views',resolve('./src/views'))
        .set('config',resolve('./src/config'))
        .set('mixins',resolve('./src/mixins'))
        //set第一个参数：设置的别名，第二个参数：设置的路径
    }
}