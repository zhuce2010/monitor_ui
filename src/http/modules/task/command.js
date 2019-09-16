import axios from '../../axios'

/*
 * 命令查询
 */

// 保存
export const save = (data) => {
  return axios({
    url: '/commandmanage/save',
    method: 'post',
    data
  })
}
// 删除
export const batchDelete = (data) => {
  return axios({
    url: '/commandmanage/del',
    method: 'post',
    data
  })
}
// 分页查询
export const findpage = (data) => {
  return axios({
    url: '/commandmanage/findPage',
    method: 'post',
    data
  })
}
// 不分页查询
export const list = (data) => {
  return axios({
    url: '/commandmanage/list',
    method: 'post',
    data
  })
}
