/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-28 16:19:06
 * @FilePath: \VScode\vue\vue-order-control\src\api\goods.js
 * @LastEditTime: 2022-01-17 16:30:34
 * @LastEditors: RayseaLee
 */
import { request } from './request'

export function getAllGoods({query, pageNum, pageSize}) {
  return request({
    url: 'goods',
    params: {
      query,
      pageNum,
      pageSize
    }
  })
}

export function getGoodsById(id) {
  return request({
    url: `goods/${id}`,
  })
}

export function createGoods(data) {
  return request({
    url: 'goods',
    method: 'post',
    data
  })
}