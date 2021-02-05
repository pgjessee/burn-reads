import Cookies from 'js-cookie';

export async function fetch(url, options = {}) {
	options.method = options.method || 'GET';

	options.headers = options.headers || {};

	if (options.method.toUpperCase() !== 'GET') {
		options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
		options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
	}
	// call the default window's fetch with the url and the options passed in
	const res = await window.fetch(url, options);

	// if the response's body is JSON, then parse the JSON body and set it to a
	// key of `data` on the response
	const contentType = res.headers.get('content-type');
	if (contentType && contentType.includes('application/json')) {
		const data = await res.json();
		res.data = data;
	}

	// if the response status code is 400 or above, then throw an error with the
	// error being the response
	if (res.status >= 400) throw res;

	// if the response status code is under 400, then return the response to the
	// next promise chain
	return res;
}

export function restoreCSRF() {
	return fetch('/api/csrf/restore');
}
