import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
// import ConSongDetail from '../views/ConSongDetail.vue'

/* const ConSongDetail = defineAsyncComponent(async () => {
  let s = await import('../views/ConSongDetail.vue')
  console.log('s===  ', s)
  return s
}) */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/ConSongDetail',
      name: 'ConSongDetail',
      // component: ConSongDetail
      component: async () => import('../views/ConSongDetail.vue')
    }
  ]
})

export default router

/* {
  path: '/',
  name: 'home',
  component: HomeView
},
{
  path: '/about',
  name: 'about',
  // route level code-splitting
  // this generates a separate chunk (About.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import('../views/AboutView.vue')
} */
