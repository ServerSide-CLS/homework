// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false;

Vue.use(axios);
Vue.use(ElementUI);

axios.defaults.baseURL = 'http://localhost:3000';  //设置axios根路径
// 此处一定不要忘记http://
Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
