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
// 使用手机号登陆
export const loginPhone = (data) => {
  return axios({
    url: 'loginPhone',
    method: 'post',
    data
  })
}
// 使用手机号登陆
export const getCode = (data) => {
  return axios({
    url: 'getCode',
    method: 'post',
    data
  })
}
// 使用手机号登陆
export const getCaptcha = (data) => {
  return axios({
    url: 'captcha',
    method: 'post',
    data
  })
}
// 验证session
export const checkSession = (data) => {
  return axios({
    url: 'checkSession',
    method: 'post',
    data
  })
}
