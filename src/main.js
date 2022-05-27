import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import vuetify from './plugins/vuetify.js';

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)

import VuePageTransition from 'vue-page-transition'
Vue.use(VuePageTransition)


import Tinder from 'vue-tinder'
Vue.use(Tinder)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')