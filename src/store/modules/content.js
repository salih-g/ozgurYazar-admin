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

		async createSection({ state }, section) {
			state.contentError = '';

			const config = {
				headers: {
					Authorization: 'Bearer ' + state.token,
				},
			};

			return await axios()
				.post(
					`/admin/contents/createSection/${section._id}`,
					{ title: section.sectionName, published: section.published },
					config,
				)
				.then((r) => {
					return r.data;
				})
				.catch(() => {
					state.contentError = 'Icerik olusturulamadi!';
				});
		},

		async updateSection({ state }, data) {
			state.contentError = '';

			const config = {
				headers: {
					Authorization: 'Bearer ' + state.token,
				},
			};

			console.log(data);

			return await axios()
				.put(
					`/admin/contents/updateContent/${data._id}`,
					{ title: data.title, desc: data.desc, published: data.published },
					config,
				)
				.then((r) => {
					return r.data;
				})
				.catch(() => {
					state.contentError = 'Icerik olusturulamadi!';
				});
		},
	},
};
