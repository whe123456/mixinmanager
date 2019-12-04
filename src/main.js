// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/global.scss'
import axios from './utils/axios'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.axios = axios

/* eslint-disable no-new */
const vm = new Vue({
	router,
	components: { App },
	template: '<App/>'
}).$mount("#app")
export default vm
