import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
import Login from '@/views/Login'
import Home from '@/views/Home'
import Schedual from '@/views/Schedual/Index'
export default new Router({
  routes: [
    {
      path: '/Home',
      name: '首页',
      component: Home,
    },
    {
      path: '/',
      name: '登录',
      component: Login
    },
    {
      path: '/Schedual/Index',
      name: '排版计划',
      component: Schedual
    },




  ],
})
/*
// to 即将跳转的页面
// from 要离开的额页面
// next 函数
this.$router.beforeEach((to, from, next) => {
  // 获取cookie中的信息，进行校验
  let token = Cookies.get('token')
  let userName = sessionStorage.getItem('user')

    if (!userName) {
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({path: '/'})
    } else {
      // 加载动态菜单和路由
      addDynamicMenuAndRoutes(userName, to, from)
      next()
    }

})*/

