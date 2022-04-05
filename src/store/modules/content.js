import axios from '../../api/axios';
import router from '../../router';
export default {
	namespaced: true,
	state: {
		token: localStorage.getItem('token') || null,
		contents: [],
		contentById: {},
		contentError: '',
	},
	actions: {
		createContent({ state }, data) {
			state.contentError = '';

			const config = {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
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
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			};

			return await axios()
				.get('/admin/contents', config)
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
					Authorization: 'Bearer ' + localStorage.getItem('token'),
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
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			};

			return await axios()
				.post(
					`/admin/contents/sections/${section._id}`,
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

		async updateContent({ state }, data) {
			state.contentError = '';

			const config = {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			};

			return await axios()
				.patch(
					`/admin/contents/${data._id}`,
					{
						title: data.title,
						desc: data.desc,
						published: data.published,
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

		async updateSection({ state }, data) {
			state.contentError = '';

			const config = {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			};

			return await axios()
				.patch(
					`/admin/contents/sections/${data._id}`,
					{
						title: data.title,
						published: data.published,
					},
					config,
				)
				.then((r) => {
					return r.data;
				})
				.catch(() => {
					state.contentError = 'Icerik Degistirilemedi!';
				});
		},

		async deleteSection({ state }, _id) {
			state.contentError = '';

			const config = {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			};

			return await axios()
				.delete(`/admin/contents/sections/${_id}`, config)
				.then((r) => {
					return r.data;
				})
				.catch(() => {
					state.contentError = 'Icerik Silinemedi!';
				});
		},
	},
};
