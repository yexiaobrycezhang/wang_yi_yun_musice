<script setup>
import SongDetail from './SongDetail.vue';
import MusicTrack from './MusicTrack.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { playlistDetail, playListTrack } from '../js/request.js'
import { userFooterSongStore } from '../stores/footerSong.js'

const store = userFooterSongStore();
const route = useRoute();


const flg = ref(false);
const id = ref({});
const musicList = ref({});
const trackList = ref({});

const imgUrl = ref('https://p1.music.126.net/gLfLVQWT8GzkjrHHVG9AZQ==/109951165146221736.jpg')

console.log('song detail  song detail ====')

id.value = route.query.id
let res = await playlistDetail(id.value);
musicList.value = res;
console.log('musicList ===  ', musicList)

trackList.value = await playListTrack(id.value, 20, 0);
store.setSongDetail(trackList.value.songs)
imgUrl.value = res.playlist.coverImgUrl
flg.value = true;

/* onBeforeMount(async () => {
    id.value = route.query.id
    let res = await playlistDetail(id.value);
    musicList.value = res;
    console.log('musicList ===  ', musicList)

    trackList.value = await playListTrack(id.value, 20, 0);
    imgUrl.value = res.playlist.coverImgUrl
    flg.value = true;

}) */
</script>
<template>
    <div style="overflow: hidden;">
        <img :src="imgUrl" class="imgBg">
        <SongDetail :trackList="trackList" :musicList="musicList" :id="id" />
        <MusicTrack :trackList="trackList" :musicList="musicList" :id="id" />



    </div>

</template>
<style scoped lang="less">
.imgBg {
    position: absolute;
    width: 100%;
    filter: blur(1.875rem);
    z-index: -1;

}
</style>