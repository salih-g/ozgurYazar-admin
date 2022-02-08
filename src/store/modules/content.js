import axios from '../../api/axios';
import router from '../../router';
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
				.then(() => router.push('/'))
				.catch(() => {
					state.contentError = 'Icerik olusturulamadi!';
				});
		},

		async getContents({ state }) {
			state.contentError = '';

			const config = {
				headers: {
					Authorization: 'Bearer ' + state.token,
				},
			};

			return await axios()
				.get('/admin/contents', config)
				.then((r) => {
					state.contents = r.data;
					console.log(r.data);
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

			return await axios()
				.put(
					`/admin/contents/updateContent/${data._id}`,
					{
						title: data.title,
						desc: data.desc,
						published: data.published,
						sections: data.sections,
					},
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
