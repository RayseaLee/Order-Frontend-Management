/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-28 09:16:22
 * @FilePath: \vue\vue-order-control\src\api\coupon.js
 * @LastEditTime: 2021-12-28 14:45:48
 * @LastEditors: RayseaLee
 */
import {request} from './request'

export function getAllCoupons() {
  return request({
    url: 'coupons',
  })
}

export function createCoupon(data) {
  return request({
    url: 'coupons',
    method: 'post',
    data
  })
}

export function updateCouponById(id, data) {
  return request({
    url: `coupons/${id}`,
    method: 'put',
    data
  })
}

export function deleteCouponById(id) {
  return request({
    url: `coupons/${id}`,
    method: 'delete',
  })
}