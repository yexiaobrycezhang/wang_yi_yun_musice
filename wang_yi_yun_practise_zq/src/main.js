// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Marquee from 'vue3-marquee'

import App from './App.vue'
import router from './router'

// import VConsole from 'vconsole'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Marquee)

app.mount('#app')

/* const vConsole = new VConsole()
console.log(vConsole) */
