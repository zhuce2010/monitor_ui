import axios from '../../axios'

/*
 * 机构管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/leagueinfo/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/leagueinfo/delete',
        method: 'post',
        data
    })
}
// 查询机构树
export const findDomainTree = () => {
    return axios({
        url: '/leagueinfo/findTree',
        method: 'get'
    })
}
// 查询机构树
export const findDomainAll = () => {
  return axios({
    url: '/leagueinfo/findDomainAll',
    method: 'post'
  })
}

// 分页查询
export const findPage = (data) => {
  return axios({
    url: '/leagueinfo/findPage',
    method: 'post',
    data
  })
}

// 模糊分页查询
export const findlike = (data) => {
  return axios({
    url: '/leagueinfo/listlike',
    method: 'post',
    data
  })
}
//通过机构名称进行查询
export const getDomain = (data) => {
  return axios({
    url: '/leagueinfo/getDomain',
    method: 'post',
    data
  })
}
//通过机构名称进行查询
export const getDomainlist = (data) => {
  return axios({
    url: '/leagueinfo/getDomainlist',
    method: 'post',
    data
  })
}



export const getChannelByLcId = (data) => {
  return axios({
    url: '/leaguechain/getChannelByLcId',
    method: 'post',
    data
  })
}
export const getNodeByLcId = (data) => {
  return axios({
    url: '/leaguechain/getNodeByLcId',
    method: 'post',
    data
  })
}
export const getMemberByLcId = (data) => {
  return axios({
    url: '/leaguechain/getMemberByLcId',
    method: 'post',
    data
  })
}

export const getChainCodeByLcId = (data) => {
  return axios({
    url: '/leaguechain/getChainCodeByLcId',
    method: 'post',
    data
  })
}


