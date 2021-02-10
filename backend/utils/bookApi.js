const { BookApiKey } = require('../config');
const fetch = require('node-fetch');

const bookSearch = async (searchTerm, maxResults, pageNumber) => {
	const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${
		pageNumber * maxResults - maxResults
	}&maxResults=${maxResults}`;
	try {
		let res = await fetch(url);
		res = await res.json();
		const books = res.items.map(({ id, volumeInfo }) => {
			return {
				id: id,
				title: volumeInfo.title,
				authors: volumeInfo.authors,
				publisher: volumeInfo.publisher || 'Publisher Not Available',
				description: volumeInfo.description || 'Description Not Available',
				smallThumbnail: volumeInfo.imageLinks.smallThumbnail,
				thumbnail: volumeInfo.imageLinks.thumbnail,
				categories: volumeInfo.categories || 'Categories Not Available',
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
