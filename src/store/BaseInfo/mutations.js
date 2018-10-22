import * as types from '../actions.types'
import Cookies from 'js-cookie'

export default {
	[types.SET_BASE_INFO]: (state, payload) => {
		state.info = payload.info
	},
	[types.REQUEST_USER]: (state, payload) => {
		switch (payload.status) {
			case true:
				state.profile = payload.user
				state.statusUser = payload.status
				break
			case false:
				state.statusUser = false
		}
	},
	[types.AUTH_LOGOUT]: (state) => {
		state.statusUser = ''
		state.profile = {}
		Cookies.remove('token')
	}
}