<script setup>
import { ref, onMounted } from 'vue'
import { getBannerList } from '../js/request.js'


/* const images = ref([
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
]);

onMounted(() => {
    let res = getBannerList(2);
    if (res.code === 200) {
        let arr = [];
        res.data.getBannerLis
        for (const iterator of res.banners) {
            arr.push(iterator.pic);
        }
        images.value = arr
    }
    console.log('arr  == ', images.value)
})
 */

const images = ref([

]);



onMounted(async () => {
    let res = await getBannerList(2);
    if (res.code === 200) {

        res.banners
        for (const iterator of res.banners) {
            images.value.push(iterator.pic);
        }

    }

})

</script>

<template>
    <div>

        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in images" :key="image">
                <img :src="image" class="slide-img" />
            </van-swipe-item>
        </van-swipe>


    </div>
</template>


<style scoped lang="less">
.slide-img {
    height: 3rem;
    width: 100%;
    border-radius: .1rem
}
</style>