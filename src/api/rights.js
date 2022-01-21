/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-16 15:40:48
 * @FilePath: \vue\vue-order-control\src\api\rights.js
 * @LastEditTime: 2021-12-20 13:55:06
 * @LastEditors: RayseaLee
 */
import { request } from "./request";

// 获取权限列表
export function getRightsList(type) {
  return request({
    method: 'get',
    url: `rights/${type}`
  })
}

// 获取角色列表以及对应的权限
export function getRolesList() {
  return request({
    method: 'get',
    url: 'roles'
  })
}

// 添加角色
export function addRolesInfo({roleName, roleDesc}) {
  return request({
    method: 'post',
    url: 'roles',
    data: {
      roleName,
      roleDesc
    }
  })
}

// 根据Id查询角色
export function getRolesById(id) {
  return request({
    method: 'get',
    url: `roles/${id}`
  })
}

// 编辑提交角色
export function editRolesInfo(id, roleName, roleDesc) {
  return request({
    method: 'put',
    url: `roles/${id}`,
    data: {
      roleName,
      roleDesc
    }
  })
}

// 删除角色
export function removeRolesById(id) {
  return request({
    method: 'delete',
    url: `roles/${id}`
  })
}

// 为角色分配权限
export function allotRights(roleId, rids) {
  return request({
    method: 'put',
    url: `roles/${roleId}`,
    data: {
      rids
    }
  })
}

// 根据角色Id和权限Id删除对应角色的权限
export function removeRightById(roleId, rightId) {
  return request({
    method: 'delete',
    url: `roles/${roleId}/rights/${rightId}`
  })
}