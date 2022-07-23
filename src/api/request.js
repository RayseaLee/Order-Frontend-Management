/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-13 15:51:54
 * @FilePath: \vue\vue-order-control\src\api\request.js
 * @LastEditTime: 2022-03-30 17:27:03
 * @LastEditors: RayseaLee
 */
/**
 * axios网络请求的封装
 */
import axios from 'axios'
import { API_HOST } from 'config'
import nProgress from 'nprogress'

 export function request(config) {
   // 1.创建axios的实例
   const instance = axios.create({
     baseURL: API_HOST
    //  baseURL: 'http://172.19.11.201:3000/'
    //  baseURL: 'http://172.19.0.39:3000/'
    //  baseURL: 'http://192.168.0.105:3000/'
    //  baseURL: 'http://192.168.0.100:3000/'
   })
 
   // 2.拦截请求
   // 在request拦截器中展示进度条 nProgress.start()
   instance.interceptors.request.use(config => {
     // 为请求头对象添加 Token 验证的 Authorization 字段
     config.headers.Authorization = sessionStorage.getItem('token')
     nProgress.start()
    return config
   })
   // 在 response拦截器中隐藏进度条 nProgress.done()
   instance.interceptors.response.use(config => {
     nProgress.done()
     return config
   })
 
   // 3.返回promise实例
   return instance(config)
 }
 