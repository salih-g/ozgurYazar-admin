import api from '../../api';

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

			return api.createContent(state, data);
		},

		async getContents({ state }) {
			state.contentError = '';

			return api.fetchContents(state);
		},

		async getContentById({ state }, id) {
			state.contentError = 'Icerik olusturulamadi!';

			return await api.fetchContentById(state, id);
		},

		async updateContent({ state }, data) {
			state.contentError = '';

			return await api.updateContent(state, data);
		},
		async deleteContent({ state }, _id) {
			state.contentError = '';

			return await api.deleteBook(state, _id);
		},

		async createSection({ state }, section) {
			state.contentError = '';

			return await api.createSection(state, section);
		},

		async updateSection({ state }, data) {
			state.contentError = '';

			return await api.updateSection(state, data);
		},

		async deleteSection({ state }, _id) {
			state.contentError = '';

			return await api.deleteSection(state, _id);
		},
	},
};
