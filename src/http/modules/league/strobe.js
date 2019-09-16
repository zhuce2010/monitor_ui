import axios from '../../axios'

/*
 * 阀门模块
 */

// 设置阀门状态，存入redis中
export const set = (data) => {
  return axios({
    url: '/lotstrobe/setstrobe',
    method: 'post',
    data
  })
}
