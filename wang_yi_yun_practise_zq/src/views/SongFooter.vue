<script setup>
import { ref, onMounted, watch } from 'vue'
import { userFooterSongStore } from '../stores/footerSong.js'
// import { userSongLyricsStore } from '../stores/songLyrics.js'

// const songLyricsStore = userSongLyricsStore();
const store = userFooterSongStore();
// const songArr = ref(store.songDetail)
const songAudio = ref(null)
// const flg = ref(true)  // true 播放  false  暂停

const playMusic = function () {
    /* 
        try {
            songAudio.value.play();
            store.setFlg(false);
        } catch (error) {
            store.setFlg(true);
        } */

    // console.dir(songAudio.value.play())
    songAudio.value.play().then((resolve) => {
        store.setFlg(false);
        console.log('resolve == ', resolve)
    }).catch(function (error) {
        console.error('method playMusic error ', error);
        store.setFlg(true);
    })

}

const suspendSong = function () {
    store.setFlg(true);;
    songAudio.value.pause();
}

onMounted(() => {
    console.log('src ===  ', songAudio.value.src)
    // songAudio.value.addEventListener('canplay', playMusic);
    store.changeAudioObj(songAudio.value);
})

const nextSong = async function () {

    let index = store.index;
    let songDetail = store.songDetail;
    if (songDetail.length == 1 || songDetail.length == 0) {
        return;
    }
    let nextIndex = index + 1;
    if (nextIndex === songDetail.length) {
        nextIndex = 0;
    }
    store.setIndex(nextIndex);
    store.setFlg(true);



    /* await new Promise((resolve) => {
        setTimeout(resolve, 1500);
        console.log('异步操作 完成');
    }) */

    // songAudio.value.removeEventListener('canplay', playMusic);


}

const changeToMs = function (l) {
    if (!l) {
        return "00:00"
    } else {

        //默认不会超过  59:59
        // let l = store.audioObj.duration;
        l = parseInt(parseInt(l) % 3600);
        let m = parseInt(l / 60);
        let s = l % 60;
        return (m > 10 ? m : ('0' + m)) + ":" + (s > 10 ? s : ('0' + s));
    }
}

const showLyrics = function () {
    store.changeFlg(true)
}

watch(() => store.index, () => {
    store.setFlg(true);
    playMusic();
})

/* watch(() => {

    try {
        let s = songAudio.value.duration;
        return s;
    } catch (err) {
        console.log('error      ', err);
        return 0;
    }

}, (newValue) => {

    console.log('duration   ', newValue)
    let len = changeToMs(newValue);
    songLyricsStore.changeSongLength(len);
},
    {
        immediate: true
    }) */
const setSongLength = function (e) {
    let duration = e.target.duration;
    store.setSongLen(duration)
    let len = changeToMs(duration);
    store.changeSongLength(len);
}

const getCurrentLength = function (e) {
    let currentTime = e.target.currentTime;
    store.setReaTimeLen(currentTime);
    let len = changeToMs(currentTime);
    store.setHasLenght(len);

}

// audio  元素   事件 loadedmetadata 
// 当第一个音频文件字节数据到达时，会触发loadeddata事件。虽然播放头已经就位，但还没有准备好播放。

</script>
<template>
    <div class="con">

        <div class="left" @click="showLyrics">
            <img :src="store.songDetail[store.index].al.picUrl">
            <div class="leftLeft">
                <div style="font-size:0.3rem ; font-weight: bold; width: 2.5rem; overflow: hidden;
                white-space: nowrap; text-overflow: ellipsis;">
                    {{ store.songDetail[store.index].name }}
                </div>
                <span style="font-size: 0.2rem;">横滑可以切换上下首哦</span>
            </div>
        </div>
        <div class="right">
            <img src="../assets/播放 (2).svg" v-if="store.flg" @click="playMusic">
            <img src="../assets/暂停.svg" v-if="!store.flg" @click="suspendSong">
            <img src="../assets/下一首.svg" @click="nextSong">
            <img src="../assets/歌曲列表.svg">
        </div>

    </div>
    <audio ref="songAudio" controls preload="auto"
        :src="`https://music.163.com/song/media/outer/url?id=${store.songDetail[store.index].id}.mp3`"
        style="position: fixed; top:120px;  display: none; " @loadedmetadata="setSongLength"
        @timeupdate="getCurrentLength" :loop="true" />


</template>

<style scoped lang="less">
.con {
    background-color: white;
    position: fixed;
    bottom: 0;
    height: 1.4rem;
    width: 100%;
    border-top: 0.02rem solid lightgray;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0.2rem;
    padding-right: 0.2rem;

    .left {
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
            width: 1rem;
            height: auto;
            border-radius: 50%;
        }

        .leftLeft {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            margin-left: 0.4rem;
        }

    }

    .right {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-right: 0.2rem;

        img {
            width: 0.5rem;
            height: auto;
            margin-right: 0.3rem;
        }
    }
}
</style>