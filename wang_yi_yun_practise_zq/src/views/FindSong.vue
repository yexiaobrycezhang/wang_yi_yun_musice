<script setup>
import { ref, onMounted } from 'vue'
import { personalized } from '../js/request.js'



const arr = ref([]);

onMounted(async () => {
    let res = await personalized();
    if (res.code === 200) {
        arr.value = res.result;
        // debugger;
    }
})

const fun1 = function (x) {
    let y = String(x);
    if (x >= 10000) {
        return y.substring(0, y.length - 4) + "." + y.substring(y.length - 4, y.length - 3) + '万';
    } else if (y < 10000) {
        return y;
    }

}



</script>
<template>
    <div class="container">
        <div class="title">
            <div style="font-size:20px; font-weight: bold;">发现好歌单</div>
            <div class="title-right">查看更多</div>
        </div>
        <div class="imgSlide">
            <van-swipe :loop="false">
                <van-swipe-item v-for="(item, key) in arr" :key="key">
                    <div class="imgCon">
                        <div class="itemImg">
                            <span class="floatSpan">
                                <img src="../assets/播放.svg" class="playCount"> {{ fun1(item.playCount) }}
                            </span>
                            <img :src="item.picUrl" class="imgEach" />
                        </div>
                        <span style="font-size: 13px;">{{ item.name }}</span>
                    </div>

                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<style scoped lang="less">
.container {
    .title {
        display: flex;
        justify-content: space-between;
        margin-top: .1875rem;
        margin-bottom: .2rem;

        .title-right {
            border: 1px solid grey;
            padding: 0 .3rem;
            border-radius: 624999.9375rem;
            display: flex;
            align-items: center;
        }
    }

    .imgSlide {
        overflow: hidden !important;

        :deep(.van-swipe-item) {
            margin-right: .2rem;
            width: 2.25rem !important;
            // height: 2.25rem !important;

            .imgCon {
                overflow: visible !important;

                .itemImg {
                    position: relative;

                    .floatSpan {
                        position: absolute;
                        top: 0px;
                        background-color: rgb(102, 102, 102);
                        border-radius: 999999999px;
                        padding: .1rem;
                        color: white;
                        font-size: .2rem;

                        .playCount {
                            width: .15rem;
                        }
                    }

                    .imgEach {
                        border-radius: 10%;

                        width: 100%;
                        height: auto;
                    }
                }
            }
        }


        :deep(.van-swipe__indicators) {
            display: none;
        }
    }
}
</style>