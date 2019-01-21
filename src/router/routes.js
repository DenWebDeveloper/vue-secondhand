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
			},
			{
				name: 'products',
				path: 'products',
				component: () => import('../views/Products.vue'),
			},
			{
				name: 'parameters',
				path: 'parameters',
				component: () => import('../views/Parameters.vue'),
			}
		]
	},
	{
		path: '/auth',
		name: 'auth',
		component: () => import('../views/Auth.vue'),
	},
	{
		path: '*',
		component: () => import('../views/404.vue'),
	}
]

export default routes
