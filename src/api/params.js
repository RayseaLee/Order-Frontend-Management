/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-01-11 15:54:00
 * @FilePath: \VScode\vue\vue-order-control\src\api\params.js
 * @LastEditTime: 2022-01-12 09:14:14
 * @LastEditors: RayseaLee
 */
import { request } from './request'

export function getAllParams() {
  return request ({
    url: 'params'
  })
}

export function createParam(data) {
  return request({
    url: 'params',
    method: 'post',
    data
  })
}

export function updateParam(data) {
  return request({
    url: 'params',
    method: 'put',
    data
  })
}

export function deleteParamById(id) {
  return request({
    url: `params/${id}`,
    method: 'delete',
  })
}