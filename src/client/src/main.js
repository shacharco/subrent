import {createApp} from 'vue'
// import Vuex from 'vuex'
// import VueRouter from 'vue-router';
import App from './App.vue'
import router from './router.js'
import store from './store.js'

// function createApp(){
//     console.log("creating app")
//     const app = new Vue({
//         // el: '#app',
//         router,
//         store,
//         render: h => h(App),
//         // template: '<App/>',
//         // components: { App }      
//     });
//     return app;
// }
// createApp();
// const app = createApp({
//     // el: '#app',
//     router,
//     store,
//     render: h => h(App),
//     // template: '<App/>',
//     // components: { App }      
// });
// app.mount('#app');
createApp(App).use(router).use(store).mount('#app')

// document.body.appendChild(app.$el);

// module.exports = {createApp}