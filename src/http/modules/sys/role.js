import axios from '../../axios'

/*
 * 角色管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/role/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/role/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/role/findPage',
        method: 'post',
        data
    })
}
// 查询全部
export const findAll = () => {
    return axios({
        url: '/role/findAll',
        method: 'get'
    })
}
// 查询角色菜单集合
export const findRoleMenus = (params) => {
    return axios({
        url: '/role/findRoleMenus',
        method: 'get',
        params
    })
}

// 查询角色菜单集合
export const findPermissions = (params) => {
  return axios({
    url: '/role/findPermissions',
    method: 'post',
    params
  })
}

// 查询角色菜单集合
export const findRolePermissions = (params) => {
  return axios({
    url: '/role/findRolePermissions',
    method: 'post',
    params
  })
}

// 保存角色菜单集合
export const saveRoleMenus = (data) => {
    return axios({
        url: '/role/saveRoleMenus',
        method: 'post',
        data
    })
}

// 保存角色权限集合
export const saveRolePermis = (data) => {
  return axios({
    url: '/role/saveRolePermis',
    method: 'post',
    data
  })
}

// 模糊分页查询
export const findlike = (data) => {
  return axios({
    url: '/role/listlike',
    method: 'post',
    data
  })
}
