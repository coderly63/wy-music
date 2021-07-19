import axios from 'axios'
import nProgress from 'nprogress'

//导入进度条
import NProcess from 'nprogress'
import 'nprogress/nprogress.css'

const instance = axios.create({
  // baseURL: 'https://wy-music-api.vercel.app/',
  baseURL: 'http://localhost:3333/',
  timeout: 5000,
  withCredentials: true,
})
instance.interceptors.request.use(res => {
  NProcess.start();
  return res;
})
instance.interceptors.response.use(res => {
  if (res.status == 200) {
    nProgress.done();
    return res.data;
  }
  else {
    console.log(res.status);
  }
}, (err) => {
  console.log(err, err.status);
})

export default instance
