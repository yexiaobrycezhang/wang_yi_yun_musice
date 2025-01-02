import { getRequest } from './fetch.js'

export const getBannerList = async function (type) {
  let url = 'banner'
  let res = await getRequest(url, { type: type })
  return res
}

export const personalized = async function () {
  let url = 'personalized'
  let res = await getRequest(url, { limit: 10 })
  return res
}

export const playlistDetail = async function (id) {
  let url = '/playlist/detail'
  let res = await getRequest(url, { id: id })
  return res
}

//获取歌单所有歌曲
export const playListTrack = async function (id, limit, offset) {
  let url = '/playlist/track/all'
  let data = { id: id, limit: limit, offset: offset }
  let res = await getRequest(url, data)
  return res
}

//获取歌词
export const getLyric = async function (id) {
  let url = '/lyric'
  let data = { id: id }
  let res = await getRequest(url, data)
  return res
}
