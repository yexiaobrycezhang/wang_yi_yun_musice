<script setup>
import { ref } from 'vue'
const props = defineProps(['trackList', 'musicList']);
import { userFooterSongStore } from '../stores/footerSong.js'
const flg = ref(false)
const store = userFooterSongStore();

console.log('trackList  === ', props.trackList)

if (props.trackList && Array.isArray(props.trackList.songs)) {
    flg.value = true;
}


const changeStoreIndex = function (index) {
    store.setIndex(index)
}

// console.log('trackList length === ', props.trackList.songs.length)

/* watch(props.trackList, (newValue) => {
    console.log("trackList newValue == ", newValue)
    if (newValue && Array.isArray(newValue.songs)) {
        flg.value = true;
    }
}, { immediate: true }) */


</script>

<template>
    <div class="con" v-if="flg">
        <div class="top">

            <div class="topLeft">
                <img src="../assets/播放 (1).svg" style="width: 0.5rem;">
                <span style="font-size: .32rem; font-weight: bold; margin-left: 0.2rem;">播放全部
                    <span style="font-size: 0.25rem; color: lightgrey;">共({{ props.trackList.songs.length }})首</span>
                </span>
            </div>
            <div class="topRight">

                <img src="../assets/加号1.svg" style="width: 20%; height: auto;" />
                <span>收藏 ({{ props.musicList.playlist.subscribedCount }})</span>

            </div>

        </div>

        <div class="item" v-for="(item, index) in props.trackList.songs" :key="item.id">
            <div class="left" @click="changeStoreIndex(index)">
                <span style="margin-right: 0.24rem;">
                    {{ index + 1 }}
                </span>
                <div class="songWriter">
                    <span style="font-weight: bold;  font-size: 0.28rem;">
                        {{ item.name }}
                    </span>
                    <div style="font-size: 0.2rem; color: lightgray;">
                        <span v-for="eachItem in item.ar" :key="eachItem.id">
                            {{ eachItem.name }}
                        </span>
                    </div>
                </div>

            </div>
            <div class="right">
                <img src="../assets/视频播放.svg" v-if="item.mv !== 0">
                <img src="../assets/汉堡菜单 (1).svg">
            </div>
        </div>

    </div>
</template>

<style scoped lang="less">
.con {
    background-color: white;
    // padding-top: 0.8rem;

    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;

    padding-left: 0.3rem;
    padding-right: 0.3rem;

    padding-top: 0.3rem;

    // overflow: hidden;


    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .topLeft {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .topRight {
            background-color: red;
            color: white;
            width: 3rem;
            height: 0.8rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-radius: 10000rem;
        }

    }

    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.3rem;

        .left {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .songWriter {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
            }

        }

        .right {
            img {
                max-width: 0.42rem;
                height: auto;
                padding-right: 0.3rem;
            }
        }

    }
}
</style>