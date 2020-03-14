import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index/Index'
import Login from '@/view/login/Index'

import sss from '@/components/upload/Upload'

Vue.use(Router)

export default new Router({
  mode : 'hash',
  routes: [
    {path: '/',redirect: '/sss'},
    //首页
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    //登录页
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    //登录页
    {
      path: '/sss',
      name: 'sss',
      component: sss
    },
  ]
})
