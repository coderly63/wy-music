import axios from '../index'
import moment from 'moment'
//获取歌手描述
export function getArtistDesc(id) {
  return axios({
    url: '/artist/desc',
    params: {
      id: id
    }
  })
}
//获取歌手详情
export function getArtistDetail(id) {
  return axios({
    url: '/artist/detail',
    params: {
      id: id
    }
  })
}
/**获取歌手热门五十首歌曲 */
export function getArtistHot50(id) {
  return axios({
    url: '/artist/top/song',
    params: {
      id: id
    }
  })
}
/**歌手 */
export function getArtist(area, type, name = -1, limit, offset = 1) {
  return axios({
    url: '/artist/list',
    params: {
      area: area,
      type: type,
      limit: limit,
      initial: name,
      offset: offset
    }
  })
}

/**获取歌手专辑 */
export function getArtistAlbum(id) {
  return axios({
    url: '/artist/album',
    params: {
      id: id
    }
  })
}

/**获取专辑内容 */
export function getAlbum(id) {
  return axios({
    url: '/album',
    params: {
      id: id
    }
  })
}


/**获取相似歌手 */
export function getSimiArtist(id) {
  return axios({
    url: '/simi/artist',
    params: {
      id: id
    }
  })
}

/**mv */
export function getArtistMv(id) {
  return axios({
    url: '/artist/mv',
    params: {
      id: id
    }
  })
}
//对专辑内容进行整理封装
export class songDetail {
  constructor(song) {
    this.id = song.id;
    this.album = song.al.name;
    this.name = song.name;
    this.time = moment(song.dt).format('mm:ss');
    this.artist = song.ar[0].name;
    this.pic = song.al.picUrl;
  }
}

export class albumInfo {
  constructor(album) {
    this.id = album.id;
    this.pic = album.picUrl;
    this.name = album.name;
    this.desc = album.description;
    this.artist = album.artist.name;
    moment.locale();
    this.publishTime = moment(album.publishTime).format('ll');
    this.company = album.company;

  }
}