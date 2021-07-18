import axios from 'axios'

const instance = axios.create({
  // baseURL: 'https://wy-music-api.vercel.app/',
  baseURL: 'http://localhost:3333/',
  timeout: 5000,
  withCredentials: true,
})
instance.interceptors.response.use(res => {
  if (res.status == 200) {
    return res.data;
  }
  else {
    console.log(res.status);
  }
}, (err) => {
  console.log(err, err.status);
})

export default instance
