import axios from 'axios';

export default () => {
	return axios.create({
		baseURL: process.env.VUE_APP_SERVICE_URL || 'http://localhost:8081/',
	});
};
