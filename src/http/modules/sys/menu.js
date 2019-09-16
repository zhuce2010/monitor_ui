import axios from '../../axios'

/*
 * 菜单管理模块
 */

 // 保存
export const save = (data) => {
    return axios({
        url: '/menu/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/menu/delete',
        method: 'post',
        data
    })
}
// 查找导航菜单树
export const findNavTree = (params) => {
    return axios({
        url: '/menu/findNavTree',
        method: 'post',
        params
    })
}
// 查找导航菜单树
export const findMenuTree = () => {
    return axios({
        url: '/menu/findMenuTree',
        method: 'get'
    })
}

// 查找所有的菜单
export const findMenuAll = () => {
  return axios({
    url: '/menu/findMenuAll',
    method: 'post'
  })
}

// 查找所有的权限
export const findPermisAll = () => {
  return axios({
    url: '/menu/findPermisAll',
    method: 'post'
  })
}

// 查找所有的权限
export const findPermisTree = () => {
  return axios({
    url: '/menu/findPermisTree',
    method: 'get'
  })
}

// 模糊分页查询
export const findlike = (data) => {
  return axios({
    url: '/menu/listlike',
    method: 'post',
    data
  })
}


// 模糊查询,不分页
export const findlikenopage = (data) => {
  return axios({
    url: '/menu/listlikenopage',
    method: 'post',
    data
  })
}
