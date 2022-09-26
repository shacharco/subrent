import Vue from 'vue'
import VueRouter from 'vue-router';
import Find from './public/components/Find.vue';
import Post from './public/components/Post.vue';
import User from './public/components/User.vue';
import Product from './public/components/Product.vue';

const routes = [
  {
    path: '/',
    name: 'Start',
    component: Find
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
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router