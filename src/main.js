/*
 * @Description: 入口文件 main.js
 * @Author: RayseaLee
 * @Date: 2021-12-07 14:11:31
 * @FilePath: \vue\vue-order-control\src\main.js
 * @LastEditTime: 2021-12-15 13:47:02
 * @LastEditors: RayseaLee
 */
import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
// 导入图标字体
import "./assets/fonts/iconfont.css"
import router from './router'
import "./assets/css/global.css"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
