import axios from '../../axios'

/*
 * 用户模块
 */

// 保存
export const save = (data) => {
  return axios({
    url: '/chaincode/save',
    method: 'post',
    data
  })
}
// 删除
export const batchDelete = (data) => {
  return axios({
    url: '/chaincode/del',
    method: 'post',
    data
  })
}
// 分页查询
export const findPage = (data) => {
  return axios({
    url: '/chaincode/findPage',
    method: 'post',
    data
  })
}
// 精确获取数据
export const find = (data) => {
  return axios({
    url: '/chaincode/list',
    method: 'post',
    data
  })
}
// 获取所有数据
export const findAll = () => {
  return axios({
    url: '/chaincode/listall',
    method: 'post',
  })
}
// 模糊获取数据
export const findlike = (data) => {
  return axios({
    url: '/chaincode/listlike',
    method: 'post',
    data
  })
}
// 模糊获取数据
export const downloadFile = (data={}) => {
  return axios({
    url: '/chaincodeDetails/download',
    method: 'post',
    data,
    responseType: 'arraybuffer',
  })
}
