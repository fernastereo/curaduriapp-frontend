import Vue from 'vue';
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue'
// import axios from "axios";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.use(VueRouter)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
// Vue.prototype.$axios = axios;
Vue.prototype.$api_host = 'http://curaduriapp.test';

const routes = [];

const router = new VueRouter({
  routes // short for `routes: routes`
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
