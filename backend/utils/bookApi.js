// const { BookApiKey } = require('../config');
const fetch = require('node-fetch');
const { Kindling_Shelf, Kindling_Book, Book, Burn, User } = require('../db/models');

const getBookRating = burns => {
	if (!burns) return 0;
	const avgRating = burns.reduce((avg, { rating }, idx, burns) => {
		return (avg += rating / burns.length);
	}, 0);

	return avgRating;
};

//just gets shelves
const getShelves = async (googleBookId, userId) => {
	let kindlingShelves;
	let book = await Book.findOne({
		where: {
			google_book_id: googleBookId,
		},
	});
	if (book) {
		kindlingBooks = await Kindling_Book.findAll({
			where: {
				book_id: book.id,
			},
			include: {
				model: Kindling_Shelf,
				include: User,
				where: {
					user_id: userId,
				},
			},
		});

		kindlingShelves = kindlingBooks.map(kindlingBook => {
			return {
				id: kindlingBook.Kindling_Shelf.id,
				name: kindlingBook.Kindling_Shelf.shelf_name,
			};
		});
	} else {
		kindlingShelves = [];
	}

	return { kindlingShelves };
};

const getBurns = async (googleBookId, userId) => {
	let burns;
	let book = await Book.findOne({
		where: {
			google_book_id: googleBookId,
		},
	});

	if (book) {
		burns = await Burn.findAll({
			where: {
				book_id: book.id,
			},
		});
	} else {
		burns = [];
	}

	return { burns };
};

const bookSearch = async (searchTerm, maxResults, pageNumber, userId) => {
	const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${
		pageNumber * maxResults - maxResults
	}&maxResults=${maxResults}`;
	try {
		let res = await fetch(url);
		res = await res.json();
		const books = await Promise.all(
			res.items.map(async ({ id, volumeInfo }) => {
				let { burns } = await getBurns(id, userId);
				let { title, authors, publisher, description, imageLinks, categories } = volumeInfo;
				avgRating = getBookRating(burns);
				let bookInfo = {
					id: id,
					title: title || 'Title Not Available',
					authors: authors || 'Author Not Available',
					rating: avgRating || 0,
					publisher: publisher || 'Publisher Not Available',
					description: description || 'Description Not Available',
					smallThumbnail: imageLinks ? imageLinks.smallThumbnail : null,
					thumbnail: imageLinks ? imageLinks.thumbnail : null,
					categories: categories || 'Categories Not Available',
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

const getBookInfo = async (bookId, userId) => {
	if (!bookId) {
		return {
			id: id || 0,
			title: volumeInfo.title || 'Title Not Available',
			authors: volumeInfo.authors || 'Author Not Available',
			rating: avgRating || 0,
			publisher: volumeInfo.publisher || 'Publisher Not Available',
			description: volumeInfo.description || 'Description Not Available',
			smallThumbnail: volumeInfo.imageLinks.smallThumbnail || null,
			thumbnail: volumeInfo.imageLinks.thumbnail || null,
			categories: volumeInfo.categories || 'Categories Not Available',
		};
	}
	const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
	let res = await fetch(url);
	let book = await res.json();

	let { id, volumeInfo } = book;
	let { burns } = await getBurns(id, userId);
	let avgRating = getBookRating(burns);

	book = {
		id: id,
		title: volumeInfo.title || 'Title Not Available',
		authors: volumeInfo.authors || 'Author Not Available',
		rating: avgRating || 0,
		publisher: volumeInfo.publisher || 'Not Available',
		description: volumeInfo.description || 'Not Available',
		smallThumbnail: volumeInfo.imageLinks.smallThumbnail || null,
		thumbnail: volumeInfo.imageLinks.thumbnail || null,
		categories: volumeInfo.categories || 'Categories Not Available',
	};

	return book;
};

module.exports = {
	bookSearch,
	getBookInfo,
};
