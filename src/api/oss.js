import axios from '@/utils/axios.js'

export function policy() {
  return axios({
    url: 'http://www.51ywyf.com/ywyf-weixin/upload/uploadPic1.do',
    method: 'post',
  })
}