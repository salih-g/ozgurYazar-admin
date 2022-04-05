import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import authStore from '@/store/modules/auth';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		meta: {
			requiresAuth: true,
		},
		component: () => import('../views/Home.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		meta: {
			requiresAuth: false,
		},
		component: () => import('../views/login/Login.vue'),
	},
	{
		path: '/new',
		name: 'New',
		meta: {
			requiresAuth: true,
		},
		component: () => import('../views/new/New.vue'),
	},
	{
		path: '/edit/:id',
		name: 'Edit',
		meta: {
			requiresAuth: true,
		},
		component: () => import('../views/edit/Edit.vue'),
	},
	{
		path: '/sections/:id',
		name: 'Section',
		meta: {
			requiresAuth: true,
		},
		component: () => import('../views/sectionEdit/SectionEdit.vue'),
	},
	{
		path: '*',
		meta: {
			requiresAuth: true,
		},
		component: () => import('../views/404.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, _, next) => {
	const authenticatedUser = localStorage.getItem('token');
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

	if (requiresAuth && !authenticatedUser) next({ name: 'Login' });
	else next();
});

export default router;
