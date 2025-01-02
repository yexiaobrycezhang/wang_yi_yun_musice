<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { fun1 } from '../js/common.js'

const props = defineProps(['trackList', 'musicList', 'id']);
const router = useRouter();

// const coverImgUrl = ref('');


const flg = ref(false)
// const onClickLeft = () => router.go(-1);
const onClickLeft = () => {
    router.push({
        path: '/',
    }).catch(error => {
        console.log('route faile ', error.message);
    })
};

if (props.musicList.playlist) {
    flg.value = true;
}

/* onBeforeMount(() => {
    coverImgUrl.value = props.musicList.playlist.coverImgUrl
})
 */

/* watch(props.musicList, (newValue) => {
    if (newValue) {
        flg.value = true;
    }
}, { immediate: true }) */

</script>

<template>
    <div class="cover" v-if="flg">
        <!-- <div class="cover"> -->

        <!-- <img :src="props.musicList.playlist.coverImgUrl" class="bgPic"> -->
        <!-- <img :src="coverImgUrl" class="bgPic"> -->
        <div class="header">
            <div class="left" @click="onClickLeft">
                <img src="../assets/返回.svg" />
                <span>歌单</span>
            </div>
            <div class="right">
                <img src="../assets/搜索.svg">
                <img src="../assets/汉堡菜单.svg">
            </div>

        </div>
        <div class="middle">
            <div class="middleLeftCon">
                <img :src="props.musicList.playlist.coverImgUrl" class="middleLeft">
                <div class="middleLeftPlay">
                    <img src="../assets/播放.svg">
                    <span>{{ fun1(props.musicList.playlist.playCount) }}</span>
                </div>
            </div>

            <div class="middleRight">
                <div class="middleTop">{{ props.musicList.playlist.name }}</div>
                <div class="middleM">
                    <img :src="props.musicList.playlist.creator.avatarUrl" class="mOne">
                    <span>{{ props.musicList.playlist.creator.nickname }}</span>
                    <img src="../assets/前进.svg" class="mForward">
                </div>

                <div class="middleEnd">
                    <div class="middleEndWord">{{ props.musicList.playlist.description }}</div>
                    <img src="../assets/前进.svg">
                </div>
            </div>

        </div>
        <div class="end">
            <div class="one endItem"><img src="../assets/留言.svg"><span>{{ props.musicList.playlist.commentCount
                    }}</span>
            </div>
            <div class="two endItem"><img src="../assets/分享.svg"><span>{{ props.musicList.playlist.shareCount }}</span>
            </div>
            <div class="tree endItem"> <img src="../assets/下载.svg"><span>下载</span></div>
            <div class="four endItem"><img src="../assets/选择-多选.svg"><span>多选</span></div>
        </div>

    </div>



</template>
<style scoped lang="less">
.cover {
    position: relative;
    overflow: hidden;
    padding-top: 0.2rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    padding-bottom: 0.15rem;

    .bgPic {
        position: absolute;
        width: 200%;
        height: 7.8rem;
        filter: blur(1.875rem);
        z-index: -9999;
        // opacity: 0.8;
        overflow: hidden;

    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 30%;
            font-size: 0.38rem;
            color: white;

            img {
                max-width: 30%;
                height: auto;
            }
        }

        .right {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 30%;

            img {
                max-width: 20%;
                height: auto;
            }
        }
    }

    .middle {
        margin-top: .425rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .middleLeftCon {
            position: relative;

            .middleLeft {
                width: 2.5rem;
                height: 2.5rem;
                display: block;
                border-radius: 10px;
            }

            .middleLeftPlay {
                background-color: rgb(102, 102, 102);
                color: white;
                position: absolute;
                right: 0;
                bottom: 0.01rem;
                border-radius: 1000rem;
                font-size: 0.2rem;
                width: 1.3rem;
                line-height: 2;
                display: flex;
                align-items: center;
                justify-content: space-around;

                img {
                    max-width: 0.2rem;
                    height: auto;
                }
            }
        }


        .middleRight {
            height: 2.8rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            margin-left: 0.2rem;
            color: white;

            .middleTop {
                width: 4rem;
                overflow: hidden;
                color: rgb(255, 255, 255);
                // white-space: nowrap;
            }

            .middleM {
                display: flex;
                justify-content: flex-start;
                align-items: center;

                .mOne {
                    margin-right: 0.1rem;
                    max-width: 0.5rem;
                    height: auto;
                    display: block;
                    border-radius: 50%;
                }

                .mForward {
                    margin-left: .0625rem;
                    max-width: 0.25rem;
                    height: auto;

                }
            }

            .middleEnd {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .middleEndWord {
                    font-size: 12px;

                    height: 2.8em;
                    width: 3rem;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    // white-space: nowrap;
                }

                img {
                    margin-left: .0625rem;
                    max-width: 0.25rem;
                    height: auto;
                }
            }



        }
    }

    .end {
        margin-top: .325rem;
        display: flex;
        justify-content: space-around;
        align-content: center;
        color: white;
        height: 55px;
        // overflow: hidden;

        .endItem {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 1rem;

            img {
                width: .5rem;
                height: auto;
            }
        }


    }

}
</style>

<!-- 
必选参数 : id : 歌单 id

可选参数 : s : 歌单最近的 s 个收藏者,默认为 8

接口地址 : /playlist/detail

调用例子 : /playlist/detail?id=24381616

获取歌单所有歌曲 

================================================================================

歌单详情动态
说明 : 调用后可获取歌单详情动态部分,如评论数,是否收藏,播放数

必选参数 : id : 歌单 id

接口地址 : /playlist/detail/dynamic

调用例子 : /playlist/detail/dynamic?id=24381616

歌单更新播放量
说明 : 调用后可更新歌单播放量

必选参数 : id : 歌单 id

接口地址 : /playlist/update/playcount

调用例子 : /playlist/update/playcount?id=24381616




subscribedCount  收藏数


-->