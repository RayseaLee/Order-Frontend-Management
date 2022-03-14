/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-22 15:30:26
 * @FilePath: \vue\vue-order-control\src\api\store.js
 * @LastEditTime: 2022-03-05 14:55:41
 * @LastEditors: RayseaLee
 */
import {request} from './request'

// 获取
export function getStoreInfo() {
  return request({
    url: 'storefront'
  })
}

// 上传店面Logo
export function uploadStoreLogo(data) {
  return request({
    url: 'upload',
    method: 'post',
    data
  })
}

// 更新店面信息
export function updateStoreInfo(data) {
  return request({
    url: 'storefront',
    method: 'put',
    data
  })
}

// 添加轮播图
export function createSwiper(data) {
  return request({
    url: 'swipers',
    method: 'post',
    data
  })
}

// 获取轮播图信息
export function getSwiperInfo({pageNum, pageSize}) {
  return request({
    url: 'swipers',
    params: {
      pageNum,
      pageSize
    }
  })
}

// 删除轮播图
export function deleteSwiperById(id) {
  return request({
    url: `swipers/${id}`,
    method: 'delete'
  })
}