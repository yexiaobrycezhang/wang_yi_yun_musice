import { defineStore } from 'pinia'

import { songDetail } from './songDetail.js'
import { lyricsToaArr } from '../js/common.js'
export const userFooterSongStore = defineStore('footerSong', {
  state: () => ({
    flg: true, // true 播放  false  暂停
    index: 0,
    songDetail: songDetail,
    lyricsFlg: false, //  是否展示歌词
    lyricsObject: {}, // 通过 http 请求  返回的结果  ， 没有处理
    audioObj: {}, // audio 元素的 对象
    songLength: '00:00',
    hasLength: '00:00',
    songLen: 0, // 歌曲长度
    reaTimeLen: 0, // 歌曲实时长度
    lyricsArr: [] // 歌词数组（ 已经处理过了）
  }),
  getters: {},
  actions: {
    setSongDetail(songDetail) {
      console.log('songDetial is  ', songDetail)
      this.songDetail = songDetail
    },
    setIndex(index) {
      this.index = index
    },
    setFlg(flg) {
      this.flg = flg
    },
    changeFlg(flg) {
      // console.log(' event target  is  ', e)
      this.lyricsFlg = flg
    },
    changeLyricsObject(obj) {
      this.lyricsObject = obj
    },
    changeAudioObj(obj) {
      this.audioObj = obj
    },
    // 改变audio 的   currentTime  的 属性（单位为  秒）
    changeAudioCurrentTime(time) {
      if (!this.audioObj) {
        return
      }
      this.audioObj.currentTime = time
    },
    changeSongLength(obj) {
      this.songLength = obj
    },
    setHasLenght(obj) {
      this.hasLength = obj
    },
    setSongLen(obj) {
      this.songLen = obj
    },
    setReaTimeLen(obj) {
      this.reaTimeLen = obj
    },
    // 播放音乐
    playMusic() {
      if (!this.audioObj) {
        return
      }
      // const footerSong = footerSong1()
      this.audioObj
        .play()
        .then((resolve) => {
          // footerSong.setFlg(false)
          this.flg = false
          console.log('resolve == ', resolve)
        })
        .catch(function (error) {
          console.error('method playMusic error ', error)
          // footerSong.setFlg(true)
          this.flg = true
        })
    },
    suspendMusic() {
      /*       store.setFlg(true);;
    songAudio.value.pause(); */
      if (!this.audioObj) {
        return
      }
      // const footerSong = footerSong1()
      this.flg = true
      // footerSong.setFlg(true)
      this.audioObj.pause()
    },
    // 下一首音乐
    async nextMusic(id) {
      // let index = store.index
      // const footerSong = footerSong1()
      // let index = footerSong.index
      // let songDetail = footerSong.songDetail
      if (this.songDetail.length == 1 || this.songDetail.length == 0) {
        return
      }
      let nextIndex = this.index + 1
      if (nextIndex === this.songDetail.length) {
        nextIndex = 0
      }
      // footerSong.setIndex(nextIndex)
      this.index = nextIndex
      // footerSong.setFlg(true)
      this.flg = true
      let obj = await lyricsToaArr(id, this.songLen)
      this.lyricsArr = obj.arrResult
      this.lyricsObject = obj.lyricsObj
    }
  }
})
