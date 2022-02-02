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
		getContentById({ state }, id) {
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
					state.contentError = 'Icerik olusturulamadi!';
				});
		},
		createSection({ state }, section) {
			state.contentError = '';

			const config = {
				headers: {
					Authorization: 'Bearer ' + state.token,
				},
			};

			console.log(section);
			return axios()
				.post(
					`/admin/contents/createSection/${section._id}`,
					{ title: section.sectionName, published: section.published },
					config,
				)
				.then(() => {})
				.catch(() => {
					state.contentError = 'Icerik olusturulamadi!';
				});
		},
	},
};
