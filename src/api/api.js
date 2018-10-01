import Cookies from 'js-cookie'
import axios from 'axios'

const api = axios.create({
	baseURL: 'http://temppostasp-001-site1.atempurl.com/api',
	timeout: 5000,
})

api.interceptors.request.use((config) => {
	const token = Cookies.get('token')
	if (token) config.headers.Token = token
	return config
}, (err) => {
	// Do something with request error
	return Promise.reject(err)
})


api.interceptors.response.use((response) => {
	return response
}, (err) => {
	if (err.response && err.response.status === 401) {
		Cookies.remove('token')
		window.href = '/'
	}
	return Promise.reject(err)
})


export default api
