import axios from '../../axios'

/*
 * 用户管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/user/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/user/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/user/findPage',
        method: 'post',
        data
    })
}
// 查找用户的菜单权限标识集合
export const findPermissions = (params) => {
    return axios({
        url: '/user/findPermissions',
        method: 'post',
        params
    })
}

// 模糊分页查询
export const findlike = (data) => {
  return axios({
    url: '/user/listlike',
    method: 'post',
    data
  })
}
// 分页查询
export const list = (data) => {
  return axios({
    url: '/user/list',
    method: 'post',
    data
  })
}
