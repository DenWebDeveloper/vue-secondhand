import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import ToggleButton from 'vue-js-toggle-button'

import './assets/style.scss'

Vue.config.productionTip = false

Vue.use(ToggleButton)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

