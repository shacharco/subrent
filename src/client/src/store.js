// import Vue from 'vue';
import {createStore} from 'vuex';
import {fetchJson} from "./js/utils.js";

// Vue.use(Vuex)

const store = new createStore({
  state: {
    user: undefined
  },
  mutations: {
    UPDATE_USER: function(state, payload){
      state.user = payload;
    }
  },
  actions: {
    addUser: async function(context, payload){
      const user = await fetchJson("/api/currentUser", null, "GET");
      console.log(user)
      context.commit("UPDATE_USER", user);

    }
  },
  modules: {}
})

export default store