<script setup>
import { watch, ref, onMounted } from 'vue'
// import { userSongLyricsStore } from '../stores/songLyrics.js'
import { userFooterSongStore } from '../stores/footerSong.js'
import { lyricsToaArr } from '../js/common.js'
// import ConSongDetail from './ConSongDetail.vue';

const twoRef = ref(null)

const noneImgRef = ref(null)

const ownImgDivRef = ref(null)

// const store = userSongLyricsStore();

const store2 = userFooterSongStore();

const flg = ref(true);// 默认有图片

const changeZIndex = function () {
    console.log('changeZIndex  changeZIndex  changeZIndex  changeZIndex  ', flg.value)
    let tmp = flg.value
    flg.value = !tmp;
    console.log('changeZIndex  changeZIndex   after  ', flg.value)
}

const styleCon = ref(
    {
        backgroundImage: `url('${store2.songDetail[store2.index].al.picUrl}')`,
        height: '100%',
        // transform: 'scale(1.1)',
        // backdropFilter: 'blur(15px)'
    }
)
const nextPlayMusic = function () {
    let songDetail = store2.songDetail;
    let index = store2.index;
    if (index === (songDetail.length - 1)) {
        index = 0;
    } else {
        index = index + 1;
    }
    store2.setIndex(index);
    songObj.value = store2.songDetail[index];
    store2.nextMusic(songObj.value.id);
}

const songObj = ref(store2.songDetail[store2.index])

// const lyricsArr = ref([]);

onMounted(() => {
    // audioObj.value = store.auidoObj
    console.log('song detaile  == ')
})

const changeCurrentTime = function (event) {
    if (event.target.value) {
        store2.changeAudioCurrentTime(event.target.value)
    }
}



watch(() => store2.flg, async (newValue) => {

    if (newValue) {

        console.log(newValue);
        styleCon.value.backgroundImage = `url('${store2.songDetail[store2.index].al.picUrl}')`
        songObj.value = store2.songDetail[store2.index]
        let obj = store2.songDetail[store2.index];
        console.log('obj  id   ', obj.id)

        let result = await lyricsToaArr(obj.id, store2.songLen)
        store2.lyricsArr = result.arrResult
        console.log('lyricsArr value is   ', result.arrResult)
        store2.changeLyricsObject(result.lyricsObj);
        // store.nextMusic()

        console.log('after newValue   ', newValue)
        console.log('after styleCon ', styleCon.value)
    }
},
    {
        immediate: true
    })

watch(() => store2.reaTimeLen, (newValue) => {
    if (!store2.flg) { // 歌词页面关闭时
        return;
    }

    if (!twoRef.value) {
        return;
    }

    console.log('newValue is ', newValue)
    console.log('this.$refs.two.scrollTop ', twoRef.value.scrollTop)

    // let element = document.querySelector('div.activeLyrics');
    // if (!element) {// activeLyrics  不存在
    // return
    // }
    // 后去 容器 two 的高度
    // let two = document.querySelector('.con > .two')
    if (flg.value) {
        console.log('图片旋转显示 ', flg.value)

        if (ownImgDivRef.value === null) {
            return  // 防止 没有挂载上
        }
        let element = document.querySelector(".ownImgDiv .activeLyrics")
        if (element === null) {
            return
        }
        // 获取 element元素 据 最近父元素  的 高度距离
        let offsetTop = element.offsetTop;
        let clientHeigth = ownImgDivRef.value.clientHeight;
        console.warn('scrollTop  before  ', ownImgDivRef.value.scrollTop)
        console.warn('offsetTop before  ', element.offsetTop)
        console.warn('clientHeigth before  ', ownImgDivRef.value.clientHeight)
        // two.scrollTop = offsetTop - clientHeigth / 2;  // 设置不了 scrollTop 属性， 奇怪
        // 设置 为 ref = twoRef  高度的 一半位置 进行固定
        if (offsetTop >= clientHeigth / 2) {
            ownImgDivRef.value.scrollTop = offsetTop - clientHeigth / 2;
        }
        // ownImgDivRef.value.scrollTop = offsetTop;
        console.warn('scrollTop after  ', ownImgDivRef.value.scrollTop)
        console.warn('offsetTop after  ', element.offsetTop)
        console.warn('clientHeigth after  ', ownImgDivRef.value.clientHeight)
    } else {
        if (noneImgRef.value == null) { // 防止 初次渲染不存在
            return;
        }
        // 让正在显示的歌词处于 two 容器的一半
        let element = document.querySelector('.noneImg  .activeLyrics');
        if (element === null) {
            return;
        }
        console.log('图片旋转不显示  ', flg.value)
        // 获取 element元素 据 最近父元素  的 高度距离
        let offsetTop = element.offsetTop;
        let clientHeigth = noneImgRef.value.clientHeight; // 歌词容器的高度
        console.warn('scrollTop  before  ', noneImgRef.value.scrollTop)
        console.warn('offsetTop before  ', element.offsetTop)
        console.warn('clientHeigth before  ', noneImgRef.value.clientHeight)
        // two.scrollTop = offsetTop - clientHeigth / 2;  // 设置不了 scrollTop 属性， 奇怪
        // 设置 为 ref = twoRef  高度的 一半位置 进行固定
        if (offsetTop >= clientHeigth / 2) {
            noneImgRef.value.scrollTop = offsetTop - clientHeigth / 2;
        }

        console.warn('scrollTop after  ', noneImgRef.value.scrollTop)
        console.warn('offsetTop after  ', element.offsetTop)
        console.warn('clientHeigth after  ', noneImgRef.value.clientHeight)
    }
})

</script>
<template>


    <van-popup :show="store2.lyricsFlg" position="bottom" :style="{ height: '100%' }">
        <img :src="store2.songDetail[store2.index].al.picUrl" style="position: absolute; z-index: -1;
        filter: blur(15px);  width: 100%; height: 100%;">
        <div class="con">
            <div class="one">
                <!-- <button @click="store.changeFlg(false)">close</button> -->
                <img src="../assets/下拉.svg" width="40px" height="40px" @click="store2.changeFlg(false)">
                <div class="oneMiddle" style="color: white; width: 50%;">
                    <Vue3Marquee :duration="5" :pauseOnHover="true">
                        <div class="marquee">{{ songObj.name }}</div>
                    </Vue3Marquee>
                    <div style="display: flex; justify-content: flex-start; align-items: center;">
                        <span v-for="(item, index) in songObj.ar" :key="item.id">
                            <span v-if="index === (songObj.ar.length - 1)">
                                {{ item.name }}

                            </span>
                            <span v-else>{{ item.name }} </span>
                        </span>
                        <img src="../assets/向右.svg" width="15px">
                    </div>
                </div>
                <img src="../assets/分享.svg" width="30px" height="30px">
            </div>
            <div class="two" @click="changeZIndex" ref="twoRef">
                <img :src="store2.songDetail[store2.index].al.picUrl" v-if="flg" ref="rotateImg">
                <!-- <div class="ownImg" v-if="flg"> -->
                <div class="ownImgDiv" ref="ownImgDivRef" v-if="flg">
                    <div v-for="(item, index) in store2.lyricsArr" :key="index"
                        :class="{ activeLyrics: store2.reaTimeLen * 1000 >= item.len && store2.reaTimeLen * 1000 < item.after }"
                        :realTimeLen="store2.reaTimeLen * 1000" :len="item.len" :after="item.after"> <!-- 有图片 -->
                        {{ item.lyrics }}
                    </div>
                </div>

                <!-- </div> -->
                <div class="noneImg" v-if="!flg" ref="noneImgRef"> <!-- 无图片 -->
                    <div v-for="(item, index) in store2.lyricsArr" :key="index"
                        :class="{ activeLyrics: store2.reaTimeLen * 1000 >= item.len && store2.reaTimeLen * 1000 < item.after }"
                        :realTimeLen="store2.reaTimeLen * 1000" :len="item.len" :after="item.after">
                        {{ item.lyrics }} </div>
                </div>
            </div>
            <div class="three">
                <img src="../assets/爱心.svg">
                <img src="../assets/下载 (1).svg">
                <img src="../assets/光盘.svg">
                <img src="../assets/评论.svg">
                <img src="../assets/三个点点.svg">
            </div>
            <div class="four">
                <span>{{ store2.hasLength }}</span>
                <input type="range" v-model="store2.reaTimeLen" min="0" :max="store2.songLen" step="0.1"
                    @change="changeCurrentTime">
                <span> {{ store2.songLength }}</span>
            </div>
            <div class="five">
                <img src="../assets/列表循环.svg">
                <img src="../assets/上一首.svg">
                <img src="../assets/播放_three.svg" @click="playMusic">
                <img src="../assets/暂停.svg" v-if="false" @click="suspendMusi">
                <img src="../assets/下一首_one.svg" @click="nextPlayMusic">
                <img src="../assets/汉堡菜单_four.svg">
            </div>
        </div>

    </van-popup>

</template>
<style scoped lang="less">
.con {
    height: 100%;

    .one {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: .2rem;
        margin-right: .2rem;
        margin-bottom: 0.8rem;

        .oneMiddle {}
    }

    .two {
        position: relative;
        box-sizing: border-box;
        height: 60%;
        // overflow: scroll;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            // position: absolute;
            // transform: scale(1);
            width: 5rem;
            clip-path: circle(50%);
            // top: 1.3rem;
            animation: mmmmm 15s linear infinite;
            // z-index: -1;

        }

        .noImg {
            // z-index: 1;
            display: none;
        }

        .noneImg {
            // z-index: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 80%;
            font-size: 0.35rem;
            position: relative;
            overflow-y: scroll;

            div {
                margin-top: 0.5rem;
                text-align: center;
            }

            .activeLyrics {
                color: #f4a331;
                font-size: 1.3em;
            }
        }


        .ownImgDiv {
            // overflow: scroll;
            overflow-y: scroll;
            // overflow: visible;
            height: 27%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            font-size: 0.35rem;
            margin-top: 0.625rem;
            position: relative;

            div {
                // margin-top: 0.25rem;
                text-align: center;
            }

            .activeLyrics {
                color: #f4a331;
                font-size: 1.3em;
            }


        }

        /*  .noneImg {
            top: 0.6rem;
        } */

        /* div {
            margin-top: 0.35rem;
            // width: 50%;
        } */
    }

    .three {
        margin-top: 0.8rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        img {
            width: 7%;
        }
    }

    .four {
        color: white;
        margin-top: 0.3rem;
        display: flex;
        justify-content: space-around;

        input {
            width: 70%;
            height: 0.07rem;
        }
    }

    .five {
        margin-top: 0.3rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        img {
            width: 7%;
        }
    }

}


@keyframes mmmmm {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>