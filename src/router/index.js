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
		component: () => import('../views/Login.vue'),
	},
	// {
	// 	path: '/new',
	// 	name: 'New',
	// 	component: () => {
	// 		if (isLoggedIn) {
	// 			return import('../views/create/New.vue');
	// 		} else {
	// 			router.push('login');
	// 		}
	// 	},
	// },
	// {
	// 	path: '/edit/:id',
	// 	name: 'Edit',
	// 	component: () => {
	// 		if (isLoggedIn) {
	// 			return import('../views/edit/Edit.vue');
	// 		} else {
	// 			router.push('login');
	// 		}
	// 	},
	// },
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
	// { path: '*', component: import('../views/404.vue') },
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, _, next) => {
	store.dispatch('auth/fetchToken');
	if (to.fullPath === '/') {
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
