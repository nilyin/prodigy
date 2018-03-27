import Vue from "vue";
import { sync } from "vuex-router-sync";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import AsyncComputed from "vue-async-computed";

import App from "./components/App";
import router from "./router";
import store from "./store";

Vue.use(ElementUI);
Vue.use(AsyncComputed);

sync(store, router);

const app = new Vue({
  router,
  store,
  ...App
});

export { app, router, store };
