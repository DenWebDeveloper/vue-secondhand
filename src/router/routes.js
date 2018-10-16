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
	{
		path: '/groups',
		name: 'groups',
		component: () => import('../views/Groups.vue'),
	},
]

export default routes