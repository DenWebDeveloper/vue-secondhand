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

Vue.prototype.$notifyError = ({msg, duration}) => ElementUI.Notification.error({
	title: 'Помилка :(',
	message: msg,
	duration: duration ? duration : 5000,
})

Vue.prototype.$notifySuccess = () => ElementUI.Notification({
	title: 'Все добре :)',
	message: 'Всі данні збережені',
	type: 'success'
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

