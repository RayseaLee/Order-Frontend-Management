/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-03-29 10:10:30
 * @FilePath: \vue-order-control\src\api\order.js
 * @LastEditTime: 2022-04-18 16:09:59
 * @LastEditors: RayseaLee
 */
import { request } from './request'

export function getOrderInfo(params) {
  return request({
    url: 'orders',
    params
  })
}

export function updateOrderStatus(data) {
  return request({
    url: 'orders',
    method: 'PUT',
    data
  })
}

export function getEvaluation() {
  return request({
    url: 'evaluations'
  })
}

export function replyEvaluation(data) {
  return request({
    url: 'evaluations',
    method: 'PUT',
    data
  })
}