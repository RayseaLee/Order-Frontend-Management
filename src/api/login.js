/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-13 15:54:38
 * @FilePath: \vue\vue-order-control\src\api\login.js
 * @LastEditTime: 2021-12-20 16:43:19
 * @LastEditors: RayseaLee
 */
import { request } from './request'
import { encrypt } from '../common/encrypt'

export function getUserInfo({username, password}) {
  return request({
    method: 'post',
    url: 'login',
    data: {
      username,
      password: encrypt(password)
    }
  })
}