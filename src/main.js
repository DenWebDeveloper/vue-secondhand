import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

import api from './api'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ua'
import './assets/style.scss'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, {locale})

Vue.config.productionTip = false

Vue.prototype.$api = api

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

