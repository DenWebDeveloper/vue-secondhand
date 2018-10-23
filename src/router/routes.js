const routes = [
	{
		path: '/',
		redirect:'/orders',
		name: 'home',
		component: () => import('../views/Main.vue'),
		children:[
			{
				name: 'orders',
				path: 'orders',
				component: () => import('../views/Orders.vue'),
			},
			{
				name: 'groups',
				path: 'groups',
				component: () => import('../views/Groups.vue'),
			},
			{
				name: 'settings',
				path: 'settings',
				component: () => import('../views/Settings.vue'),
			}
		]
	},
	{
		path: '/auth',
		name: 'auth',
		component: () => import('../views/Auth.vue'),
	}
]

export default routes