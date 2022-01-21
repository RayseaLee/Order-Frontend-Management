/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-30 09:35:37
 * @FilePath: \VScode\vue\vue-order-control\src\api\category.js
 * @LastEditTime: 2021-12-31 13:55:36
 * @LastEditors: RayseaLee
 */
import {request} from './request'

export function getCateList() {
  return request({
    url: '/categorys'
  })
}

export function getGoodsCateList() {
  return request({
    url: '/categorys/goods'
  })
}

export function createCategory(data) {
  return request({
    url: '/categorys',
    method: 'post',
    data
  })
}

export function updateCategory(data) {
  return request({
    url: '/categorys',
    method: 'put',
    data
  })
}

export function deleteCategoryById(id) {
  return request({
    url: `/categorys/${id}`,
    method: 'delete'
  })
}

export function categoryIsExist(name) {
  return request({
    url: `/categorys/${name}`,
  })
}