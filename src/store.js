import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    groups: []
  },
  // GETTERS
  getters: {
    getGroup: state => id => {
      return state.groups.find(i => i.id == id);
    }
  },
  // ACTIONS
  actions: {
    recoverUser({ commit }) {
      let user = {};

      if (localStorage.getItem("golf-user")) {
        user = JSON.parse(localStorage.getItem("golf-user"));
      }

      commit("setUser", user);
    },
    recoverGroups({ commit }) {
      let groups = [];

      if (localStorage.getItem("golf-groups")) {
        groups = JSON.parse(localStorage.getItem("golf-groups"));
      }

      commit("setGroups", groups);
    },
    addGroup({ state, commit }, group) {
      return new Promise(resolve => {
        setTimeout(() => {
          group.id = state.groups.length + 1;

          commit("pushGroup", group);
          commit("updateGroups");

          resolve({
            status: "success",
            msg: "Group created successfully.",
            data: group
          });
        }, 1000);
      });
    },
    saveGroup({ commit }, group) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit("updateGroups");

          resolve({
            status: "success",
            msg: "Group updated successfully.",
            data: group
          });
        }, 1000);
      });
    }
  },
  // MUTATIONS
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    updateUser(state) {
      const parsed = JSON.stringify(state.user);
      localStorage.setItem("golf-user", parsed);
    },
    setGroups(state, groups) {
      state.groups = groups;
    },
    pushGroup(state, group) {
      state.groups.push(group);
    },
    updateGroups(state) {
      const parsed = JSON.stringify(state.groups);
      state.groups.map(i => {
        console.log("POSITIONS", i.position);
      });
      localStorage.setItem("golf-groups", parsed);
    }
  }
});
