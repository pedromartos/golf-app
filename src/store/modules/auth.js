import axios from "axios";

const state = {
  status: "",
  token: localStorage.getItem("golf-token") || "",
  user: JSON.parse(localStorage.getItem("golf-user")) || {}
};

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  getUser: state => state.user
};

const actions = {
  facebookLogin({ commit }, response) {
    commit("authRequest");

    if (response.status == "connected") {
      window.FB.api("/me", "GET", { fields: ["name", "picture"] }, function(
        fbResponse
      ) {
        commit("authSuccess", {
          token: response.authResponse.accessToken,
          user: fbResponse
        });
      });
    } else if (response.status == "unknown") {
      commit("logout");
    }
  },
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("authRequest");

      axios
        .get(`auth.json?user=${user.username}`)
        .then(response => {
          const token = response.data.token;

          axios.defaults.headers.common["Authorization"] = token;

          commit("authSuccess", { token: token, user: response.data.user });
          resolve(response);
        })
        .catch(error => {
          commit("logout");
          commit("authError");
          reject(error);
        });
    });
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit("logout");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  },
  updateUser({ commit }, user) {
    commit("setUser", user);
    commit("saveUser");
  },
  createUser({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("authRequest");

      axios
        .get(`auth.json?user=${user.username}`)
        .then(response => {
          const token = response.data.token;

          axios.defaults.headers.common["Authorization"] = token;

          commit("authSuccess", { token: token, user: response.data.user });
          resolve(response);
        })
        .catch(error => {
          commit("logout");
          commit("authError");
          reject(error);
        });
    });
  }
};

const mutations = {
  authRequest(state) {
    state.status = "loading";
  },
  authSuccess(state, data) {
    state.status = "success";
    state.token = data.token;
    state.user = data.user;

    localStorage.setItem("golf-user", JSON.stringify(state.user));
    localStorage.setItem("golf-token", data.token);
  },
  authError(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
    state.user = {};

    localStorage.removeItem("golf-token");
    localStorage.removeItem("golf-user");
  },
  setUser(state, user) {
    state.user = user;
  },
  saveUser() {
    const parsed = JSON.stringify(state.user);
    localStorage.setItem("golf-user", parsed);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
