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
	actions: {
		login({ state }, user) {
			state.loginError = '';

			return axios()
				.post('/admin/auth/login', {
					username: user.username,
					password: user.password,
				})
				.then(({ data }) => {
					state.token = data.token;
					localStorage.setItem('token', data.token);
					if (data.token !== null) router.push({ name: 'Home' });
				})
				.catch((err) => {
					console.log(err.message || err);
					state.loginError = 'Hatali giris!';
				});
		},
		logout() {
			state.token = null;
			router.push({ name: 'Login' });
		},
	},
};
