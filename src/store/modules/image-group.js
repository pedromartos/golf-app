import axios from "axios";

const state = JSON.parse(localStorage.getItem("golf-groups")) || {
  groups: [],
  lastUpdated: null
};

const getters = {
  formatGroups: state => {
    const groups = [];

    for (const group of state.groups) {
      groups.push({
        id: group.id,
        thumbnail: group.thumbnail,
        ...group.properties
      });
    }

    return groups;
  },
  getGroup: () => id => {
    return new Promise(resolve => {
      axios
        .get(`${process.env.VUE_APP_API_URL}/image-group/${id}`)
        .then(response => {
          resolve(response.data);
        });
    });
  }
};

const actions = {
  recoverGroups({ commit, rootGetters }) {
    const user = rootGetters["auth/getUser"];

    axios
      .get(`${process.env.VUE_APP_API_URL}/users/${user.id}`)
      .then(response => {
        commit("setGroups", response.data.image_groups);
      });
  },
  addGroup({ rootGetters }, group) {
    return new Promise(resolve => {
      const user = rootGetters["auth/getUser"];

      axios
        .post(`${process.env.VUE_APP_API_URL}/users/${user.id}`, group)
        .then(response => {
          const newGroup = response.data.image_groups.pop();

          resolve({
            status: "success",
            msg: "Group created successfully.",
            id: newGroup.id
          });
        });
    });
  },
  saveGroup({ state }, group) {
    return new Promise(resolve => {
      const params = { ...group };
      delete params.id;

      axios
        .put(`${process.env.VUE_APP_API_URL}/image-group/${group.id}`, params)
        .then(response => {
          resolve({
            status: "success",
            msg: "Group created successfully.",
            group: state.groups.find(i => i.id == response.data.id)
          });
        });
    });
  },
  setGroups({ commit }, groups) {
    commit("setGroups", groups);
    commit("updateGroups");
  }
};

const mutations = {
  setGroups(state, groups) {
    state.groups = groups;
    state.lastUpdated = new Date();
  },
  pushGroup(state, group) {
    state.groups.push(group);
  },
  updateGroups(state) {
    const parsed = JSON.stringify(state);
    localStorage.setItem("golf-groups", parsed);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
