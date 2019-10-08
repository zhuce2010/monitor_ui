import axios from '../../axios'

/*
 * 用户管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/duty/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/duty/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/duty/findPage',
        method: 'post',
        data
    })
}
// 查找用户的菜单权限标识集合
export const findPermissions = (params) => {
    return axios({
        url: '/duty/findPermissions',
        method: 'post',
        params
    })
}

// 查询
export const list = (data) => {
  return axios({
    url: '/duty/list',
    method: 'post',
    data
  })
}
