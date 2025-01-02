// import { userSongLyricsStore } from '../stores/songLyrics.js'
import { getLyric } from './request.js'

export const fun1 = function (x) {
  let y = String(x)
  if (x >= 10000) {
    return y.substring(0, y.length - 4) + '.' + y.substring(y.length - 4, y.length - 3) + '万'
  } else if (y < 10000) {
    return y
  }
}

// 把 歌词 转换为  歌词数组
export const lyricsToaArr = async function (id, songLen) {
  // const store = userSongLyricsStore()
  let lyricsObj = await getLyric(id)
  // store.changeLyricsObject(lyricsObj)

  let arrResult = []
  try {
    // 清空数组
    // lyricsArr.value.length = 0;
    let str = lyricsObj.lrc.lyric
    let arr = str.split('\n')
    for (let item of arr) {
      let i = item.indexOf('[')
      let j = item.indexOf(']')
      let str = item.slice(i + 1, j)
      if (str === '') {
        continue
      }
      let str2 = item.slice(j + 1)
      let arr = str.split(':')
      console.log('arr  =  ', arr)
      let arrMMss = arr[1].split('.')
      let s = arr[0] * 60 * 1000 + arrMMss[0] * 1000 + Number(arrMMss[1])
      arrResult.push({ time: str, lyrics: str2, len: s })
    }
    console.log('lyrics  length ===  ', arr.length)
    console.log('lyrics  obj ===  ', arr)
    /*  for (let item of lyricsArr.value) {
           console.log(item);
       } */

    // let length = lyricsArr.value.length;
    console.log('arrResult length  == ', arrResult.length)
    for (let i = 0; i < arrResult.length; i++) {
      console.log('lyrics i == ', i)
      if (i == arrResult.length - 1) {
        // arrResult[i].after = store.songLen
        arrResult[i].after = songLen
      } else {
        arrResult[i].after = arrResult[i + 1].len
      }
    }
  } catch (err) {
    console.error('error  === ', err)
  }
  return { arrResult, lyricsObj }
}
