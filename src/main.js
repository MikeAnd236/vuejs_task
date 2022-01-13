import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import Routes from "./router/routes";
import VueSpinners from "vue-spinners"

Vue.use(VueSpinners)

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCoffee);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
});

new Vue({
  render: (h) => h(App),
  router: router,
}).$mount("#app");
