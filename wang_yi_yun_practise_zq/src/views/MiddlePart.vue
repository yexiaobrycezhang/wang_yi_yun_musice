<script setup>



</script>

<template>
    <div class="container">
        <div class="imgCon">
            <img src="../assets/每日推荐.svg" class="first">
            <span>每日推荐</span>
        </div>
        <div class="imgCon">
            <img src="../assets/私人FM.svg" class="second">
            <span>私人FM</span>
        </div>
        <div class="imgCon">
            <img src="../assets/歌单.svg" class="third">
            <span>歌单</span>
        </div>
        <div class="imgCon">
            <img src="../assets/排行榜.svg" class="fourth">
            <span>排行版</span>
        </div>
    </div>
</template>

<style scoped lang="less">
.container {
    display: flex;
    justify-content: space-between;
    text-align: center;

    .imgCon {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        img {
            width: 50%;
        }
    }



    /*  .first {
        width: 61%;
    }

    .second {
        width: 61%;
    } */
}
</style>
