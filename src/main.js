import Vue from 'vue';
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue'
import VueSimpleAlert from "vue-simple-alert";


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.use(VueRouter)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSimpleAlert);
// Vue.prototype.$axios = axios;
Vue.prototype.$api_host = 'http://54.215.27.25/curaduriapp';

const routes = [];

const router = new VueRouter({
  routes // short for `routes: routes`
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
