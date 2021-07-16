import axios from '../index'
//转化时间戳
import moment from 'moment'
//获取排行榜歌单id
export function getTopList() {
  return axios('/toplist');
}
//获取推荐歌单列表
export function getSongList() {
  return axios('/personalized');
}
//获取歌单的详细信息
export function getPlayListDetail(id) {
  return axios('/playlist/detail', {
    params: {
      id,
    }
  })
}
//获取歌曲详细信息
export function getSongDetail(ids) {
  return axios('/song/detail', {
    params: {
      ids,
    }
  })
}
//获取歌单下的评论
export function getPlayListComment(id, limit, offset) {
  return axios('/comment/playlist', {
    params: {
      id,
      limit,
      offset
    }
  })
}
//获取歌曲url
export function getSongUrl(id) {
  return axios('/song/url', {
    params: {
      id,
    }
  })
}

//获取歌词
export function getLyric(id) {
  return axios('/lyric', {
    params: {
      id
    }
  })
}
/**对歌曲数据进行封装 */
export class songDetail {
  constructor(songs) {
    this.id = songs[0].id;
    this.name = songs[0].name;
    this.album = songs[0].al.name;
    this.artist = songs[0].ar[0].name;
    this.pic = songs[0].al.picUrl;
    // this.time = formatDate(new Date(songs[0].dt), 'mm:ss')
    this.time = moment(songs[0].dt).format('mm:ss')
  }
}

//获取推荐MV
export function getMV() {
  return axios('/personalized/mv')
}

//获取独家放送
export function getPersonal() {
  return axios('/personalized/privatecontent')
}

//获取独家放送列表
export function getPersonalList(limit, offset) {
  return axios('/personalized/privatecontent/list', {
    params: {
      limit,
      offset
    }
  })
}

/**歌单基础信息 */
export class baseInfo {
  constructor(playlist) {
    this.img = playlist.coverImgUrl || '';
    this.title = playlist.description;
    this.name = playlist.name;
    this.shareCount = playlist.shareCount;
    this.subscribedCount = playlist.subscribedCount;
    this.playCount = playlist.playCount;
    this.trackCount = playlist.trackCount;
    this.tags = playlist.tags;
    this.createTime = playlist.createTime;
    this.creatorAvatar = playlist.creator.avatarUrl;
    this.creatorName = playlist.creator.nickname;
  }
}