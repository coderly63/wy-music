import axios from '../index'

export function search(keywords, limit = 30, offset = 0, type = 1) {
  return axios('/cloudsearch', {
    params: {
      keywords,
      limit,
      offset,
      type
    }
  })
}

export function defaultSearch() {
  return axios('/search/hot')
}

export function hotSearch() {
  return axios('/search/hot/detail')
}

export function suggestSearch(keywords) {
  return axios('/search/suggest', {
    params: {
      keywords
    }
  })
}