import axios from '../../axios'

/*
 * 机构管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/dept/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/dept/delete',
        method: 'post',
        data
    })
}
// 查询机构树
export const findTree = (data) => {
    return axios({
        url: '/dept/findTree',
        method: 'post',
      data
    })
}

// 查询机构树
export const findDeptTree = (data) => {
  return axios({
    url: '/dept/findDeptTree',
    method: 'post',
    data
  })
}

// 主键查询
export const findById = (data) => {
  return axios({
    url: '/dept/findById',
    method: 'post',
    data
  })
}

// 分页查询
export const findPage = (data) => {
  return axios({
    url: '/dept/findPage',
    method: 'post',
    data
  })
}
  // 模糊分页查询
  export const findlike = (data) => {
    return axios({
      url: '/dept/listlike',
      method: 'post',
      data
    })
}
//通过机构名称进行查询
export const getDepts = (data) => {
  return axios({
    url: '/dept/getDepts',
    method: 'post',
    data
  })
}


