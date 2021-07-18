import axios from '../index'

//获取用户详细信息
export function getUserDetail(id) {
  return axios('/user/detail', {
    params: {
      id
    }
  })
}

//获取用户账号信息
export function getUserAccount() {
  return axios('/user/account')
}

//获取用户信息
export function getUserSubcount() {
  return axios('/user/subcount')
}
//获取喜欢列表
export function getUserLikeList(uid) {
  return axios('/likelist', {
    params: {
      uid
    }
  })
}

//喜欢音乐
export function likeSong(id, like = true) {
  return axios('/like', {
    params: {
      id,
      like
    }
  })
}

//获取用户歌单
export function getPlaylist(uid) {
  return axios('/user/playlist', {
    params: {
      uid
    }
  })
}