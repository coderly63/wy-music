// 轮播图的数据
import axios from '../network'

export function getBanners() {
  return axios.get('/banner')
}