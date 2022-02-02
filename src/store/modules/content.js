import axios from '../../api/axios';
export default {
	namespaced: true,
	state: {
		token: localStorage.getItem('token') || '',
		contents: [],
		contentById: {},
		contentError: '',
	},
	actions: {
		createContent({ state }, data) {
			state.contentError = '';
			const config = {
				headers: {
					Authorization: 'Bearer ' + state.token,
				},
			};

			return axios()
				.post('/admin/contents', data, config)
				.catch(() => {
					state.contentError = 'Icerik olusturulamadi!';
				});
		},
		async getContents({ state }) {
			state.contentError = '';
			return await axios()
				.get('/contents')
				.then((r) => {
					state.contents = r.data;
					return r.data;
				})
				.catch(() => {
					state.contentError = 'Icerik olusturulamadi!';
				});
		},
		getContentById(_, id) {
			state.contentError = 'Icerik olusturulamadi!';

			const config = {
				headers: {
					Authorization: 'Bearer ' + state.token,
				},
			};

			return axios()
				.get(`/admin/contents/${id}`, config)
				.then((r) => {
					return r;
				})
				.catch(() => {
					commit('setContentError', 'Icerik olusturulamadi.');
				});
		},
		createSection({ commit }, id) {
			commit('setContentError', null);
			const config = {
				headers: {
					Authorization: 'Bearer ' + state.token,
				},
			};
		},
	},
};
