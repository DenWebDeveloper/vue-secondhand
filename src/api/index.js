import Cookies from 'js-cookie'
import axios from 'axios'

const api = axios.create({
	baseURL: 'http://acgproduct-001-site1.gtempurl.com/api',
	timeout: 5000,
})

api.interceptors.request.use((config) => {
	const token = Cookies.get('token')
	if (token) config.headers.Authorization = token
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
