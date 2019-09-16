import axios from '../../axios'

/*
 * 命令查询
 */

// 保存
export const save = (data) => {
  return axios({
    url: '/template/save',
    method: 'post',
    data
  })
}
// 删除
export const batchDelete = (data) => {
  return axios({
    url: '/template/del',
    method: 'post',
    data
  })
}
// 分页查询
export const findpage = (data) => {
  return axios({
    url: '/template/findPage',
    method: 'post',
    data
  })
}
// 不分页查询
export const list = (data) => {
  return axios({
    url: '/template/list',
    method: 'post',
    data
  })
}
