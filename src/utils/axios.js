import axios from 'axios'
import { getToken } from '@/utils/auth'
import store from '@/store'

// 创建一个axios实例
const service = axios.create({
  baseURL: "", // 存在一些场景，借口一部分调这个地址一部分调另外一个地址
  timeout: 5000, // 超时时间
  withCredentials: true ,// 允许携带cookie
})
// 请求拦截器
service.interceptors.request.use(
  config => {
    if(store.getters.token){  //让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    Promise.reject(error).catch()
  }
),
// 响应拦截器      
service.interceptors.response.use(
  response => {
    // const hea=response.headers;
    // const res = response.data;
    // const sta=response.StatusCode;
    // const url=response.request.responseURL;
    //用javascript删除某一个cookie的方法，该方法传入要删除cookie的名称
      function RemoveCookie(cookieName) {
        var cookies = document.cookie.split(";");//将所有cookie键值对通过分号分割为数组

        //循环遍历所有cookie键值对
        for (var i = 0; i < cookies.length; i++) {
            //有些cookie键值对前面会莫名其妙产生一个空格，将空格去掉
            if (cookies[i].indexOf(" ") == 0) {
                cookies[i] = cookies[i].substring(1);
            }

            //比较每个cookie的名称，找到要删除的那个cookie键值对
            if (cookies[i].indexOf(cookieName) == 0) {
                var exp = new Date();//获取客户端本地当前系统时间
                exp.setTime(exp.getTime() - 60 * 1000);//将exp设置为客户端本地时间1分钟以前，将exp赋值给cookie作为过期时间后，就表示该cookie已经过期了, 那么浏览器就会将其立刻删除掉

                document.cookie = cookies[i] + ";expires=" + exp.toUTCString();//设置要删除的cookie的过期时间，即在该cookie的键值对后面再添加一个expires键值对，并将上面的exp赋给expires作为值(注意expires的值必须为UTC或者GMT时间，不能用本地时间），那么浏览器就会将该cookie立刻删除掉
                //注意document.cookie的用法很巧妙，在对其进行赋值的时候是设置单个cookie的信息，但是获取document.cookie的值的时候是返回所有cookie的信息
                console.log("code清除完成")
                break;//要删除的cookie已经在客户端被删除掉，跳出循环
            }
        }
      }
  
    if(response.status=="200"){
      RemoveCookie("code")
        
    }
    /* console.log(response)
    if(sta=="200"){
          console.log(hea)
          window.location.href = hea['Location']
    }
    if (!res.status) {
      // 泰坦框架1.8.6以前。后端session过期
      if (sta =='302') {
        // console.log(1111)
         window.location.href = hea['Location']
    
      }

      // 前后端分离，泰坦框架1.8.6以上。使用这段代码替换上面302 reload
      // var msg = response.data.message
      // if (msg && msg.indexOf('oauth2/authorize') !== -1) {
      //   window.location.href = msg
      //   return
      // }

      // return Promise.reject('error').catch()
      return response
    } else {
      // 请求成功 */
      return response
    // }
  },
  error => { // 默认除了2XX之外的都是错误的，就会走这里
    if (error.response) {
      if(error.response.status=="401"){
        let test = window.location.href;
        var code='' 
          if (test.indexOf("?") != -1) {    //判断是否有参数
            var str = test.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
            var strs = str.split("=");   //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
            var len=strs[1].split("&")
            code=len[0];         //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
        }
        document.cookie="code="+code+"";
        window.location.href = error.response.data.message
      }else if(error.response.status=="403"){
        let test = window.location.href;
        window.location.href =test+"403"
      }else if(error.response.status=="500"){
        let test = window.location.href;
        window.location.href =test+"500"
      }
      
    }
    return Promise.reject(error.response).catch()
  }
)

export default service