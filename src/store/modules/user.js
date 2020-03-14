import { login ,logout , getInfo } from "@/api/login.js"
import { getToken, setToken , removeToken } from "@/utils/auth";

let user = {
  state:{
    token:getToken(),
    name:'',
    avatar:'',
    roles:[],
  },
  mutations:{
    SET_TOKEN:(state , token) => {  
      state.token = token
    },
    SET_NAME:(state , name) => {
      state.name = name
    },
    SET_AVATAR:(state , avatar) => {
      state.avatar = avatar
    },
    SET_ROLES:(state , roles) => {
      state.roles = roles
    }
  },
  actions:{
    //登录
    Login:({commit},loginForm)=>{
      //const username = userInfo.username.trim() 这里是去除名字的空格
      return new Promise((resolve,reject) => {
        login(loginForm).then(res => {
          let data = res.data;
          let tokenStr = data.tokenHead+data.token;  //组合token
          setToken(tokenStr);
          commit('SET_TOKEN',tokenStr);
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },

    //登出
    LogOut:({commit , state}) => {
      return new Promise((resolve , reject)=>{
        logout(state.token).then(() => {
          commit('SET_TOKEN','');
          commit('SET_ROLES', []);
          removeToken();
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },

    //获取用户信息
    GetInfo:({commit , state}) => {
      return new Promise((resolve , reject) => {
        getInfo().then(response => {
          let data = response.data
          if(data.roles && data.roles.length > 0){ // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          }else{
            reject('getInfo: 角色必须是非空数组 !')
          }
          commit('SET_NAME',data.username)
          commit('SET_AVATAR',data.icon)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
} 

export default user