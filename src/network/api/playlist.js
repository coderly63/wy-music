import axios from '../index'

export function getCatList() {
  return axios('/playlist/catlist');
}

export function getPlaylist(cat = '全部', limit = 30, offset = 0) {
  return axios('/top/playlist', {
    params: {
      cat,
      limit,
      offset
    }
  })
}
