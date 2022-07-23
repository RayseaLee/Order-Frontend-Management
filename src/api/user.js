/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-15 15:49:14
 * @FilePath: \vue\vue-order-control\src\api\user.js
 * @LastEditTime: 2022-04-01 17:53:29
 * @LastEditors: RayseaLee
 */
import {request} from './request'
import {encrypt} from '../common/encrypt'

// 获取用户列表
export function getUserList({pageNum, pageSize}) {
  return request({
    url: 'users',
    params: {
      pageNum,
      pageSize
    }
  })
}

// 修改用户状态
export function updateUserState(id, type) {
  return request({
    method: 'put',
    url: `users/${id}/status/${type}`
  })
}

// 添加用户信息
export function addUserInfo({username, password, email}) {
  return request({
    method: 'post',
    url: 'users',
    data: {
      username, 
      password: encrypt(password),
      email
    }
  })
}

// 根据id查询用户信息
export function getUserById(id) {
  return request({
    method: 'get',
    url: `users/${id}`
  })
}

// 修改用户信息
export function editUserInfo(id, email) {
  return request({
    method: 'put',
    url: `users/${id}`,
    data: {
      email
    }
  })
}

// 根据Id删除一个用户
export function deleteUserById(id) {
  return request({
    method: 'delete',
    url: `users/${id}`
  })
}

// 为用户分配角色
export function assignRoles(id, roleId) {
  return request({
    method: 'put',
    url: `users/${id}/role`,
    data: {
      roleId
    }
  })
}

export function usernameIsExist(username) {
  return request({
    method: 'get',
    url: `/users/username/${username}`
  })
}