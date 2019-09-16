import axios from '../../axios'

/*
 * 字典管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/dict/save',
        method: 'post',
        data
    })
}

// 保存详情
export const detailSave = (data) => {
  return axios({
    url: '/dict/detailSave',
    method: 'post',
    data
  })
}

// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/dict/delete',
        method: 'post',
        data
    })
}

// 删除字典详情
export const batchDetailDelete = (data) => {
  return axios({
    url: '/dict/deleteDetail',
    method: 'post',
    data
  })
}

// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/dict/findPage',
        method: 'post',
        data
    })
}

// 查询字典详情
export const findDetail = (data) => {
  return axios({
    url: '/dict/findDetail',
    method: 'post',
    data
  })
}

// 分页查询
export const findDetailPage = (data) => {
  return axios({
    url: '/dict/findDetailPage',
    method: 'post',
    data
  })
}
// 模糊分页查询
export const findlike = (data) => {
  return axios({
    url: '/dict/listlike',
    method: 'post',
    data
  })
}
// 字典详情模糊分页查询
export const findlikedetail = (data) => {
  return axios({
    url: '/dict/listlikedetail',
    method: 'post',
    data
  })
}
