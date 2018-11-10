import Vue from 'vue'
import Vuex from 'vuex'

import baseInfo from './BaseInfo'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV === 'development',
	modules: {
		baseInfo
	}
})

