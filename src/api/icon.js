import axios from '../network'

export function getIcons() {
  return axios.get('/homepage/dragon/ball')
}