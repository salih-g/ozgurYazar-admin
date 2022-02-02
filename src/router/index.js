import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import authStore from '@/store/modules/auth';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/login/Login.vue'),
	},
	{
		path: '/new',
		name: 'New',
		component: () => import('../views/new/New.vue'),
	},
	{
		path: '/edit/:id',
		name: 'Edit',
		component: () => import('../views/edit/Edit.vue'),
	},
	// {
	// 	path: '/new/:id',
	// 	name: 'CreateSection',
	// 	component: () => {
	// 		if (isLoggedIn) {
	// 			return import('../views/create/CreateSection.vue');
	// 		} else {
	// 			router.push('login');
	// 		}
	// 	},
	// },
	{ path: '*', component: () => import('../views/404.vue') },
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, _, next) => {
	store.dispatch('auth/fetchToken');
	if (
		to.fullPath === '/' ||
		to.fullPath === '/new' ||
		to.fullPath === '/edit/:id'
	) {
		if (!authStore.state.token) {
			next({ name: 'Login' });
		}
	}
	if (to.fullPath === '/login') {
		if (authStore.state.token) {
			next({ name: 'Home' });
		}
	}

	next();
});

export default router;
