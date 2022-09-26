import Vue from 'vue';
import Vuex from 'vuex';
import {fetchJson} from "./public/js/utils.js";

Vue.use(Vuex)

const store = new Vuex.Store({
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
      const user = await fetchJson("/auth/local", payload);
      console.log(user)
      context.commit("UPDATE_USER", user);

    }
  },
  modules: {}
})

export default store