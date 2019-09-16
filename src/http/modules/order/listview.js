import axios from '../../axios'

/*
 * 用户模块
 */

// 保存
export const save = (data) => {
  return axios({
    url: '/order/save',
    method: 'post',
    data
  })
}
// 删除
export const batchDelete = (data) => {
  return axios({
    url: '/order/del',
    method: 'post',
    data
  })
}
// 分页查询
export const findpage = (data) => {
  return axios({
    url: '/order/findPage',
    method: 'post',
    data
  })
}
// 精确获取数据
export const find = (data) => {
  return axios({
    url: '/order/list',
    method: 'post',
    data
  })
}
// 获取所有数据
export const findall = () => {
  return axios({
    url: '/order/listall',
    method: 'post',
  })
}
// 模糊获取数据
export const findlike = (data) => {
  return axios({
    url: '/order/listlike',
    method: 'post',
    data
  })
}
