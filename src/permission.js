import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from './utils/auth' // 验权

const whiteList = ['/login' , '/' , '/sss'];  //设置白名单
router.beforeEach((to , from , next) => {
  NProgress.start();
  if(getToken()){ 
    if(to.path === '/login'){  
      next({ path: '/'});
      NProgress.done() //结束Progress
    }else{
      if(store.getters.roles.length === 0){
        store.dispatch("GetInfo").then(res =>{
          next()
        }).catch(err => {
          store.dispatch('FedLogOut').then(() => {
            Message.eeror( err || '验证失败，请重新登录')
            next({path:'/'})
          })
        })
      }else{
        next()
      }
    }
  }else{
    if(whiteList.indexOf(to.path) !== -1){
      next()
    }else{
      next('login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})