const { BookApiKey } = require('../config');
const fetch = require('node-fetch');
const { Kindling_Shelf, Kindling_Book, Book, Burn } = require('../db/models');

const getBookRating = burns => {
	const avgRating = burns.reduce((avg, { rating }, idx, burns) => {
		return (avg += rating / burns.length);
	}, 0);

	return avgRating;
};

const bookSearch = async (searchTerm, maxResults, pageNumber) => {
	const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${
		pageNumber * maxResults - maxResults
	}&maxResults=${maxResults}`;
	try {
		let res = await fetch(url);
		res = await res.json();
		const books = await Promise.all(
			res.items.map(async ({ id, volumeInfo }) => {
				let book = await Book.findOne({
					where: { google_book_id: id },
					include: Burn,
				});
				// console.log(book);
				// console.log('these are the burns', book.Burns);
				let avgRating;
				if (book) {
					avgRating = getBookRating(book.Burns);
				}
				let bookInfo = {
					id: id,
					title: volumeInfo.title,
					authors: volumeInfo.authors,
					rating: avgRating || 0,
					publisher: volumeInfo.publisher || 'Publisher Not Available',
					description: volumeInfo.description || 'Description Not Available',
					smallThumbnail: volumeInfo.imageLinks.smallThumbnail,
					thumbnail: volumeInfo.imageLinks.thumbnail,
					categories: volumeInfo.categories || 'Categories Not Available',
				};

				return bookInfo;
			})
		);
		return books;
	} catch (error) {
		console.log('Error: ', error);
		return;
	}
};

const getBookInfo = async (bookId, burns) => {
	const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
	let res = await fetch(url);
	let book = await res.json();
	let { id, volumeInfo } = book;
	let avgRating = getBookRating(burns);

	book = {
		id: id,
		title: volumeInfo.title,
		authors: volumeInfo.authors,
		rating: avgRating || 0,
		publisher: volumeInfo.publisher || 'Not Available',
		description: volumeInfo.description || 'Not Available',
		smallThumbnail: volumeInfo.imageLinks.smallThumbnail,
		thumbnail: volumeInfo.imageLinks.thumbnail,
		categories: volumeInfo.categories || 'Categories Not Available',
	};

	return book;
};

module.exports = {
	bookSearch,
	getBookInfo,
};
