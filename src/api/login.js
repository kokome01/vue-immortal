import axios from '@/utils/axios.js'

export function login(loginForm){
  let userTel = loginForm.tel;
  let userPass = loginForm.password;
  let userCode = loginForm.code;
  return axios({
    url:'',
    method:'post',
    data:{
      userTel,
      userPass,
      userCode,
    }
  })
}

export function getInfo() {
  return axios({
    url: '/admin/info',
    method: 'get',
  })
}

export function logout() {
  return axios({
    url: '/admin/logout',
    method: 'post'
  })
}