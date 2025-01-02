<script setup>
import HeaderCom from './HeaderCom.vue'
import SlideShow from './SlideShow.vue'
import MiddlePart from './MiddlePart.vue'
import FindSongOne from './FindSongOne.vue'


</script>

<template>
    <div class="con">
        <div class="itemHome">
            <HeaderCom />
        </div>
        <div class="itemHome">
            <SlideShow />
        </div>
        <div class="itemHome">
            <MiddlePart />
        </div>
        <div class="itemHome">
            <FindSongOne />
        </div>
    </div>

</template>

<style scoped lang="less">
.con {
    padding-top: 0.2rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;

    .itemHome {
        margin-bottom: 0.2rem;
    }
}
</style>