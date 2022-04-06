import axios from './axios';
import router from '../router';

export default {
	login: (state, user) => {
		axios()
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

	createContent: (state, data) => {
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

	createSection: async (state, section) => {
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

	fetchContents: async (state) => {
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

	fetchContentById: async (state, id) => {
		const config = {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		};

		return await axios()
			.get(`/admin/contents/${id}`, config)
			.then((r) => {
				return r;
			})
			.catch(() => {
				state.contentError = 'Icerik olusturulamadi!';
			});
	},

	updateContent: async (state, data) => {
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

	updateSection: async (state, data) => {
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
					content: data.content || '',
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

	deleteSection: async (state, _id) => {
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

	fetchSectionById: async (id) => {
		const config = {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		};

		return await axios()
			.get(`/admin/contents/sections/${id}`, config)
			.then((r) => {
				return r;
			});
	},
};
