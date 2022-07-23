/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-14 19:13:59
 * @FilePath: \vue-order-control\src\api\dashboard.js
 * @LastEditTime: 2022-05-13 15:48:55
 * @LastEditors: RayseaLee
 */
import {request} from './request'

export function getMenuList(params) {
  return request({
    url: 'menus',
    params
  })
}

export function getTurnover() {
  return request({
    url: '/dashboard/turnover'
  })
}

export function getOrderInfo() {
  return request({
    url: '/dashboard/orders'
  })
}