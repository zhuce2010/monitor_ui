import axios from '../../axios'

/*
 * 系统登录模块
 */

// 登录
export const login = data => {
    return axios({
        url: 'login',
        method: 'post',
        data
    })
}

// 登出
export const logout = () => {
    return axios({
        url: 'logout',
        method: 'get'
    })
}
// 修改密码
export const updatePass = (data) => {
  return axios({
    url: 'updatePass',
    method: 'post',
    data
  })
}
