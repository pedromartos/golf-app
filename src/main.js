import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Bootstrap
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);

// Hammer.js
import { VueHammer } from "vue2-hammer";
Vue.use(VueHammer);

Vue.config.productionTip = false;

import Draggable from "./directives/draggable";
Vue.directive("draggable", Draggable);

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
