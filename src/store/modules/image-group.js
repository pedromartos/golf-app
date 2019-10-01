const state = {
  groups: []
};

const getters = {
  getGroup: state => id => {
    return state.groups.find(i => i.id == id);
  }
};

const actions = {};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
