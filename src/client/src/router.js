// import Vue from 'vue'
import {createRouter, createWebHistory} from 'vue-router';
import Home from './components/Home.vue';
import Find from './components/Find.vue';
import Post from './components/Post.vue';
import User from './components/User.vue';
import Product from './components/Product.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/find',
    name: 'Find',
    component: Find
  },
  {
    path: '/post',
    name: 'post',
    component: Post,
  },
  {
    path: '/user',
    name: 'user',
    component: User,
  },
  {
    path: '/product/:id',
    name: 'product',
    params: true,
    component: Product,
  }
]
// Vue.use(VueRouter)

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router