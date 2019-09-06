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

// Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(far);
library.add(fas);
Vue.component("fa-icon", FontAwesomeIcon);

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
