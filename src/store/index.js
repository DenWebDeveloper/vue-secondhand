import Vue from 'vue'
import Vuex from 'vuex'

import auth from './Auth'

Vue.use(Vuex)


export default new Vuex.Store({
	strict: process.env.NODE_ENV === 'development',
	modules: {
		auth
	}
})

