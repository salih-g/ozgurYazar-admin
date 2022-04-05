import api from '../../api';
import router from '../../router';

export default {
	namespaced: true,
	state: {
		token: localStorage.getItem('token') || null,
		loginError: '',
	},
	getters: {
		isLoggedIn(state) {
			return !!state.token;
		},
	},
	actions: {
		login({ state }, user) {
			state.loginError = '';

			return api.login(state, user);
		},

		logout({ state }) {
			state.token = null;
			localStorage.setItem('token', '');
			router.push({ name: 'Login' });
		},

		fetchToken({ state }) {
			state.token = localStorage.getItem('token');
		},
	},
};
