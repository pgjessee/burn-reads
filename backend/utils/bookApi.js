const { BookApiKey } = require('../config');
const fetch = require('node-fetch');

const bookSearch = async (searchTerm, resultsShown, pageNumber) => {
	const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${
		pageNumber * resultsShown - resultsShown
	}&maxResults=${resultsShown}`;
	try {
		let res = await fetch(url);
		res = await res.json();
		console.log(res);
		const books = res.items.map(({ id, volumeInfo }) => {
			return {
				id: id,
				title: volumeInfo.title,
				authors: volumeInfo.authors,
				publisher: volumeInfo.publisher || 'Not Available',
				description: volumeInfo.description || 'Not Available',
				smallThumbnail: volumeInfo.imageLinks.smallThumbnail,
				thumbnail: volumeInfo.imageLinks.thumbnail,
				categories: volumeInfo.categories,
			};
		});
		return books;
	} catch (error) {
		console.log('Error: ', error);
		return;
	}
};

const getBookInfo = async bookId => {
	const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
	let res = await fetch(url);
	let book = await res.json();
	let { id, volumeInfo } = book;
	book = {
		id: id,
		title: volumeInfo.title,
		authors: volumeInfo.authors,
		publisher: volumeInfo.publisher || 'Not Available',
		description: volumeInfo.description || 'Not Available',
		smallThumbnail: volumeInfo.imageLinks.smallThumbnail,
		thumbnail: volumeInfo.imageLinks.thumbnail,
		categories: volumeInfo.categories,
	};

	return book;
};

module.exports = {
	bookSearch,
	getBookInfo,
};
