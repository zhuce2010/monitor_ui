import axios from '../../axios'

/*
 * 定时任务
 */

// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/job/findPage',
        method: 'post',
        data
    })
}

// 分页查询
export const findLogPage = (data) => {
  return axios({
    url: '/job/log/findPage',
    method: 'post',
    data
  })
}

// 保存
export const save = (data) => {
  return axios({
    url: '/job/save',
    method: 'post',
    data
  })
}
// 删除
export const batchDelete = (data) => {
  return axios({
    url: '/job/delete',
    method: 'post',
    data
  })
}

/**
 * 暂停定时任务
 * @param data
 */
export function updateIsPause(data) {
  return axios({
    url: '/jobs/updateIsPause',
    method: 'post',
    data
  })
}

/**
 * 执行定时任务
 * @param data
 */
export function exec(data) {
  return axios({
    url: '/jobs/exec',
    method: 'post',
    data
  })
}
