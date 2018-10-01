import * as types from '../actions.types'
import api from '../../services/api'
import Cookies from "js-cookie";

export default {
    [types.REQUEST_AUTH]: ({commit, dispatch}, {email, password}) => {
        return new Promise((resolve, reject) => {

            api.post('/auth', {data: {email, password}})
                .then(resp => {
                    const token = resp.token || 'test-token';
                    commit(types.REQUEST_AUTH, {status: true, token});

                    Cookies.set('token', token || 'test-token', {expires: 7, path: '/'});
                    api.defaults.headers.common['Authorization'] = token;

                    //Перевірити чи підіймається помилка на верх
                    dispatch(types.REQUEST_USER);
                    resolve();
                })
                .catch(err => {
                    commit(types.REQUEST_AUTH, {status: false});
                    reject(err)
                })
        })
    },
    [types.REQUEST_USER]: ({commit}) => {
        return new Promise((resolve, reject) => {

            api.get('user/me')
                .then(resp => {
                    console.log('request.user.me');
                    commit(types.REQUEST_USER, {status: true, user: resp});
                    resolve();
                })
                .catch((err) => {
                    console.error(err);
                    commit(types.AUTH_LOGOUT);
                    reject()
                })
        })
    }
}