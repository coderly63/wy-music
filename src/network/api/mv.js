import axios from '../index'

/**封装mv信息 */
export class MV {
  constructor(id, cover, name, artist, count, duration) {
    this.id = id;
    this.cover = cover;
    this.name = name;
    this.artist = artist;
    this.count = count;
    this.duration = duration;
  }
}

//获取mv相关信息
export function getDetail(mvid) {
  return axios('/mv/detail', {
    params: {
      mvid,
    }
  })
}

//获取mv播放地址
export function getUrl(id) {
  return axios('/mv/url', {
    params: {
      id,
    }
  })
}

/**mv评论 */
export function getMVComment(id, limit, offset = 1) {
  return axios({
    url: '/comment/mv',
    params: {
      id: id,
      limit: limit,
      offset: offset
    }
  })
}

/**相似MV */
export function getSimiMv(id) {
  return axios({
    url: '/simi/mv',
    params: {
      mvid: id
    }
  })
}

/**推荐mv */
export function getTopMv(limit = 10, area, offset) {
  return axios({
    url: '/top/mv',
    params: {
      limit: limit,
      area,
      offset
    }
  })
}

/**全部mv */
export function AllMv(area = '全部', type = '全部', order = '最新', limit, offset = 1) {
  return axios({
    url: '/mv/all',
    params: {
      area: area,
      type: type,
      order: order,
      limit: limit,
      offset: offset
    }
  })
}

