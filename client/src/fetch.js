export const localFetch = (endpoint, option = {}) => {
	const BASE_SERVER_URL =
		process.env.NODE_ENV === 'development' ? 'http://localhost:8000/' : '';
	const url = BASE_SERVER_URL + endpoint;
	return fetch(url, option);
};
