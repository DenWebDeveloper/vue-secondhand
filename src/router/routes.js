const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('../views/Home.vue'),
	},
	{
		path: '/auth',
		name: 'auth',
		component: () => import('../views/Auth.vue'),
	},
]

export default routes