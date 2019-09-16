/*
 * 接口统一集成模块
 */
import * as monitoruser from './modules/sys/monitoruser'
import * as login from './modules/sys/login'
import * as user from './modules/sys/user'
import * as dept from './modules/sys/dept'
import * as role from './modules/sys/role'
import * as menu from './modules/sys/menu'
import * as dict from './modules/sys/dict'
import * as job from './modules/sys/job'
import * as log from './modules/sys/log'
import * as leagueinfo from './modules/league/leagueinfo'
import * as leaguenode from './modules/league/node'
import * as chaincode from './modules/league/chaincode'
import * as concentrator from './modules/league/concentrator'
import * as statistics from './modules/statistics/mater'
import * as mereader from './modules/league/mereader'
import * as strobe from './modules/league/strobe'
import * as listview from './modules/order/listview'
import * as historictask from './modules/order/historictask'
import * as command from './modules/task/command'
import * as template from './modules/task/template'
import * as member from './modules/league/member'
import * as channel from './modules/league/channel'
import * as node from './modules/league/node'
// 默认全部导出
export default {
  monitoruser,
  login,
  user,
  dept,
  role,
  menu,
  dict,
  log,
  job,
  leagueinfo,
  leaguenode,
  chaincode,
  concentrator,
  mereader,
  statistics,
  strobe,
  listview,
  command,
  template,
  member,
  channel,
  node

}
