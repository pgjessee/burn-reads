const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { getBookInfo, getShelves } = require('../../utils/bookApi');
const { Kindling_Shelf, Kindling_Book, Book, Burn } = require('../../db/models');

const router = express.Router();
const defaultShelfNames = ['Torched', 'Torching', 'Want to Torch'];

//gets all book and their info for each kindling shelf
router.get(
	'/:userId',
	asyncHandler(async (req, res, next) => {
		const { userId } = req.params;
		let defaultKindlingShelves = await Kindling_Shelf.findAll({
			where: {
				user_id: userId,
				shelf_name: ['Torched', 'Torching', 'Want to Torch'],
			},
			include: {
				model: Book,
				include: Burn,
			},
		});

		let fullDefaultKindlingShelves = await Promise.all(
			defaultKindlingShelves.map(async kindlingShelf => {
				const books = kindlingShelf.Books;
				booksInfo = await Promise.all(
					books.map(async book => {
						if (!book.google_book_id) return { title: 'Unavailable' };
						let info = await getBookInfo(book.google_book_id, userId);
						let bookRating = await Burn.findOne({
							where: {
								user_id: userId,
								book_id: book.id,
							},
						});
						if (!bookRating) {
							bookRating = [];
						}
						let { rating } = bookRating;
						info.book_id = book.id;
						info.userRating = rating;
						return info;
					})
				);
				let { id, shelf_name, user_id, createdAt } = kindlingShelf;
				const fullKindlingShelf = {
					id,
					shelf_name,
					user_id,
					createdAt,
					books: booksInfo,
				};
				return fullKindlingShelf;
			})
		);

		let customKindlingShelves = await Kindling_Shelf.findAll({
			where: {
				user_id: userId,
				shelf_name: {
					[Op.notIn]: ['Torched', 'Torching', 'Want to Torch'],
				},
			},
			include: {
				model: Book,
				include: Burn,
			},
		});

		let fullCustomKindlingShelves = await Promise.all(
			customKindlingShelves.map(async kindlingShelf => {
				const books = kindlingShelf.Books;
				let booksInfo = await Promise.all(
					books.map(async book => {
						if (!book.google_book_id) return { title: 'Unavailable' };
						info = await getBookInfo(book.google_book_id, userId);
						let bookRating = await Burn.findOne({
							where: {
								user_id: userId,
								book_id: book.id,
							},
						});
						if (!bookRating) {
							bookRating = [];
						}
						let { rating } = bookRating;
						info.book_id = book.id;
						info.userRating = rating;
						return info;
					})
				);
				let { id, shelf_name, user_id, createdAt } = kindlingShelf;
				const fullKindlingShelf = {
					id,
					shelf_name,
					user_id,
					createdAt,
					books: booksInfo,
				};
				return fullKindlingShelf;
			})
		);

		return res.json({ fullDefaultKindlingShelves, fullCustomKindlingShelves });
	})
);

//gets all custom kindling shelf names for a user
router.get(
	'/shelf-names/:userId',
	asyncHandler(async (req, res) => {
		const { userId } = req.params;
		let allShelves;
		if (parseInt(userId, 10) === 0) {
			allShelves = [
				{
					shelf_name: 'Torched',
				},
				{
					shelf_name: 'Torching',
				},
				{
					shelf_name: 'Want to Torch',
				},
			];
		} else {
			allShelves = await Kindling_Shelf.findAll({
				where: {
					user_id: userId,
				},
			});
		}
		return res.json(allShelves);
	})
);

//gets all kindling shelves for a book
router.get(
	'/:googleBookId/:userId',
	asyncHandler(async (req, res) => {
		const { googleBookId, userId } = req.params;
		const { kindlingShelves } = await getShelves(googleBookId, userId);
		return res.json(kindlingShelves);
	})
);

//sets default kindling shelves for user
router.post(
	'/new-user',
	asyncHandler(async (req, res, next) => {
		const defaultShelves = {};
		const { user_id } = req.body;
		defaultShelfNames.forEach(async shelf_name => {
			const newShelf = await Kindling_Shelf.create({ shelf_name, user_id });
			defaultShelves[shelf_name] = newShelf;
		});
		return res.json(defaultShelves);
	})
);

//creates custom shelf
router.post(
	'/',
	asyncHandler(async (req, res, next) => {
		const { shelf_name, user_id } = req.body;
		const newShelf = await Kindling_Shelf.create({
			shelf_name,
			user_id,
		});
		return res.json(newShelf);
	})
);

//add book to kindling shelf
router.post(
	'/:shelfId/:googleBookId',
	asyncHandler(async (req, res) => {
		const { shelfId, googleBookId } = req.params;

		let book = await Book.findOne({
			where: {
				google_book_id: googleBookId,
			},
		});

		if (!book) {
			book = await Book.create({
				google_book_id: googleBookId,
			});
		}

		let newKindlingBook = await Kindling_Book.create({
			kindling_shelf_id: shelfId,
			book_id: book.id,
		});

		return res.json(newKindlingBook);
	})
);

//change book to a different default kindling shelf
router.patch(
	'/:oldShelfId/:newShelfId/:googleBookId',
	asyncHandler(async (req, res) => {
		const { oldShelfId, newShelfId, googleBookId } = req.params;
		let book;
		book = await Book.findOne({
			where: {
				google_book_id: googleBookId,
			},
		});
		if (!book) {
			book = await Book.create({
				google_book_id: googleBookId,
			});
		}
		let kindlingBook = await Kindling_Book.findOne({
			where: {
				kindling_shelf_id: parseInt(oldShelfId, 10),
				book_id: book.id,
			},
		});
		if (kindlingBook) await kindlingBook.destroy();

		const newKindlingBook = await Kindling_Book.build({
			kindling_shelf_id: parseInt(newShelfId, 10),
			book_id: book.id,
		});
		newKindlingBook.save();

		return res.json({ kindlingBook, newKindlingBook });
	})
);

//remove book from a kindling shelf
router.delete(
	'/:shelfId/:googleBookId',
	asyncHandler(async (req, res) => {
		const { shelfId, googleBookId } = req.params;
		// need to find the book
		let book = await Book.findOne({
			where: {
				google_book_id: googleBookId,
			},
		});

		let kindlingBook = await Kindling_Book.findOne({
			where: {
				kindling_shelf_id: shelfId,
				book_id: book.id,
			},
		});

		kindlingBook.destroy();
		return res.json(kindlingBook);
	})
);

// rename kindling shelf
router.patch(
	'/:shelfId',
	asyncHandler(async (req, res) => {
		const { newName } = req.body;
		const shelf = await Kindling_Shelf.findOne({
			where: {
				id: req.params.shelfId,
			},
		});
		await shelf.update({
			shelf_name: newName,
		});
		return res.json(shelf);
	})
);

router.delete(
	'/:shelfId',
	asyncHandler(async (req, res) => {
		const shelfId = req.params.shelfId;
		const shelf = await Kindling_Shelf.findOne({
			where: {
				id: shelfId,
			},
		});
		await shelf.destroy();
		await Kindling_Book({
			where: {
				kindling_shelf_id: shelfId,
			},
		});
		return res.json(shelf);
	})
);

// router.get(
// 	'/shelf/:shelfId',
// 	asyncHandler(async (req, res, next) => {
// 		const shelf_id = parseInt(req.params.shelfId, 10);
// 		let shelf = await Kindling_Shelf.findByPk(shelf_id, {
// 			include: Book,
// 		});

// 		const books = shelf.Books;

// 		let info;
// 		kindlingShelf = await Promise.all(
// 			(booksInfo = await Promise.all(
// 				books.map(async book => {
// 					info = await getBookInfo(book.google_book_id, userId);
// 					info.book_id = book.id;
// 					return info;
// 				})
// 			))
// 		);

// 		return res.json(kindlingShelf);
// 	})
// );
module.exports = router;
