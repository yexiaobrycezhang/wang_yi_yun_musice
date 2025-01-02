<script setup>
import SongFooter from './views/SongFooter.vue'
import PopLyrics from './views/PopLyrics.vue'

</script>

<template>
    <div>
        <Suspense>
            <router-view />
        </Suspense>
        <SongFooter></SongFooter>
        <PopLyrics></PopLyrics>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
