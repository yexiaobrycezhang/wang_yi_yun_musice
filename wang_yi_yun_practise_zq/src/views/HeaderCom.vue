<script setup>

</script>

<template>
    <div class="headerContainer">
        <div class="leftHeader"><img src="../assets/汉堡菜单.svg" alt="left-title"></div>
        <div class="headerContent">
            <span class="title">我的</span>
            <span class="title second">发现</span>
            <span class="title">云村</span>
            <span class="title">视频</span>
        </div>
        <div class="rightHeader"><img src="../assets/搜索.svg"></div>
    </div>
</template>


<style lang="less" scoped>
.headerContainer {
    display: flex;
    justify-content: space-between;
    // align-items: center;


    .leftHeader {
        /*  width: 1rem;
        height: 1rem; */

        img {
            width: 0.5rem;
            height: 0.5rem;
            object-fit: cover;
        }
    }

    .rightHeader {
        img {
            width: 0.5rem;
            height: 0.5rem;
            object-fit: cover;
        }
    }

    .headerContent {
        display: flex;
        justify-content: space-between;


        .title {
            width: 1.2rem;
            text-align: center;

        }

        .second {
            font-weight: bold;
        }
    }
}
</style>