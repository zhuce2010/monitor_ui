/*
 * 接口统一集成模块
 */
import * as login from './modules/sys/login'
import * as user from './modules/sys/user'
import * as monitoruser from './modules/sys/monitoruser'
import * as duty from './modules/sys/duty'
import * as timeSchedule from './modules/sys/timeSchedule'

// 默认全部导出
export default {
  login,
  user,
  monitoruser,
  duty,
  timeSchedule,
}
