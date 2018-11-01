import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import Cookies from 'js-cookie'


Vue.use(VueRouter)

const router = new VueRouter({
	base: '/',
	routes: Routes
})

router.beforeEach((to, from, next) => {
	const token = Cookies.get('token')
	if (token && to.name === 'auth') {
		return next(false)
	} else if (token || to.name === 'auth') {
		return next()
	} else {
		return next({name: 'auth'})
	}
})

export default router