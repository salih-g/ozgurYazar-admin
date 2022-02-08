import router from '../../router';
import axios from '../../api/axios';

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
	mutations: {
		updateToken: (state, token) => {
			state.token = token;
		},
	},
	actions: {
		login({ state }, user) {
			state.loginError = '';

			return axios()
				.post('/auth/login', {
					username: user.username,
					password: user.password,
				})
				.then(({ data }) => {
					if (data.token !== null) {
						state.token = data.token;
						localStorage.setItem('token', data.token);
						router.push({ name: 'Home' });
					}
				})
				.catch((err) => {
					console.error(err.message || err);
					state.loginError = 'Hatali giris!';
				});
		},
		logout({ state }) {
			state.token = null;
			localStorage.setItem('token', '');
			router.push({ name: 'Login' });
		},
		fetchToken({ commit }) {
			commit('updateToken', localStorage.getItem('token'));
		},
	},
};
