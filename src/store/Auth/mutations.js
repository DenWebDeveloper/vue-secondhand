import * as types from '../actions.types'
import Cookies from "js-cookie"
import api from '../../services/api'

export default {
    [types.REQUEST_AUTH]: (state, payload) => {
        //success,error
        switch (payload.status) {

            case true:
                state.token = payload.token;
                break;
            case false:
                api.defaults.headers.common['Authorization'] = '';
                Cookies.remove('token');
                break;
        }
    },
    [types.REQUEST_USER]: (state, payload) => {
        switch (payload.status) {
            case true:
                state.profile = payload.user;
                state.statusUser = payload.status;
                break;
            case false:
                state.statusUser = false;
        }
    },
    [types.AUTH_LOGOUT]: (state) => {
        state.statusUser = '';
        state.profile = {};
        Cookies.remove('token')
    }
}