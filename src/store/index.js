import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import imageGroup from "./modules/image-group";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    imageGroup
  },

  // STATE
  state: {},

  // GETTERS
  getters: {},

  // ACTIONS
  actions: {},

  // MUTATIONS
  mutations: {}
});
