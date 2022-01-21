/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-22 15:30:26
 * @FilePath: \VScode\vue\vue-order-control\src\api\store.js
 * @LastEditTime: 2022-01-17 14:42:52
 * @LastEditors: RayseaLee
 */
import {request} from './request'

// 获取
export function getStoreInfo() {
  return request({
    url: '/storefront'
  })
}

// 上传店面Logo
export function uploadStoreLogo(data) {
  return request({
    url: '/upload',
    method: 'post',
    data
  })
}

// 更新店面信息
export function updateStoreInfo(data) {
  return request({
    url: '/storefront',
    method: 'put',
    data
  })
}