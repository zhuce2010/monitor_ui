import axios from '../../axios'

/*
 * 机构管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/leagueNode/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/leagueNode/del',
        method: 'post',
        data
    })
}
// 查询机构树
export const findDomainTree = () => {
    return axios({
        url: '/leagueNode/findTree',
        method: 'get'
    })
}

// 查询机构树
export const findPage = (data) => {
  return axios({
    url: '/leagueNode/findPage',
    method: 'post',
    data
  })
}

// 模糊获取数据
export const findlike = (data) => {
  return axios({
    url: '/leagueNode/listlike',
    method: 'post',
    data
  })
}

