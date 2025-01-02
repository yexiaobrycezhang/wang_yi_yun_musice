//  放弃
import { defineStore } from 'pinia'
import { userFooterSongStore as footerSong1 } from './footerSong'
import { lyricsToaArr } from '../js/common.js'

export const userSongLyricsStore = defineStore('songLyrics', {
  state: () => ({
    flg: false,
    lyricsObject: {},
    audioObj: {},
    songLength: '00:00',
    hasLength: '00:00',
    songLen: 0, // 歌曲长度
    reaTimeLen: 0, // 歌曲实时长度
    lyricsArr: [] // 歌词数组
  }),
  getters: {},
  actions: {
    changeFlg(flg) {
      // console.log(' event target  is  ', e)
      this.flg = flg
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
      const footerSong = footerSong1()
      this.audioObj
        .play()
        .then((resolve) => {
          footerSong.setFlg(false)
          // this.flg = false
          console.log('resolve == ', resolve)
        })
        .catch(function (error) {
          console.error('method playMusic error ', error)
          footerSong.setFlg(true)
          this.flg = true
        })
    },
    suspendMusic() {
      /*       store.setFlg(true);;
    songAudio.value.pause(); */
      if (!this.audioObj) {
        return
      }
      const footerSong = footerSong1()
      // this.flg = true
      footerSong.setFlg(true)
      this.audioObj.pause()
    },
    // 下一首音乐
    async nextMusic(id) {
      // let index = store.index
      const footerSong = footerSong1()
      let index = footerSong.index
      let songDetail = footerSong.songDetail
      if (songDetail.length == 1 || songDetail.length == 0) {
        return
      }
      let nextIndex = index + 1
      if (nextIndex === songDetail.length) {
        nextIndex = 0
      }
      footerSong.setIndex(nextIndex)
      footerSong.setFlg(true)
      let lyricsArray = await lyricsToaArr(id)
      this.lyricsArr = lyricsArray
    }
  }
})
