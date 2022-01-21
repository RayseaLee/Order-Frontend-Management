/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-14 19:13:59
 * @FilePath: \vue\vue-order-control\src\api\home.js
 * @LastEditTime: 2021-12-15 09:58:29
 * @LastEditors: RayseaLee
 */
import {request} from './request'

export function getMenuList() {
  return request({
    url: 'menus'
  })
}