import axios from '../../axios'

/*
 * 日志管理模块
 */

// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/metergather/findPage',
        method: 'post',
        data
    })
}
// 模糊获取数据
export const findlike = (data) => {
  return axios({
    url: '/metergather/listlike',
    method: 'post',
    data
  })
}
