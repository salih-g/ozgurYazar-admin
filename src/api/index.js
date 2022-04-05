import axios from './axios';

const config = {
	headers: {
		Authorization: 'Bearer ' + localStorage.getItem('token'),
	},
};

module.exports = {};
