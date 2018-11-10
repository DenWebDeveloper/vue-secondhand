import * as types from '../actions.types'
import Cookies from 'js-cookie'

export default {
	[types.SET_BASE_INFO]: (state, payload) => {
		state.info = payload.info
	},
	[types.AUTH_LOGOUT]: (state) => {
		state.info = {}
		Cookies.remove('token')
	}
}