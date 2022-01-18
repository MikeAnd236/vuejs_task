import Vue from "vue";
import Vuex from "vuex";
import menuRender from "./modules/menuRender";
import tableRender from "./modules/tableRender";


Vue.use(Vuex);

const storeData = {
  modules: {
    menuRender,
    tableRender,

  },
};

const store = new Vuex.Store(storeData);
export default store;
