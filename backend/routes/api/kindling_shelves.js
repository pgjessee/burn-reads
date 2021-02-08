const express = require('express');
const asyncHandler = require('express-async-handler');
const { getBookInfo } = require('../../utils/bookApi');
const { Kindling_Shelf, Kindling_Book, Book } = require('../../db/models');

const router = express.Router();
const defaultShelfNames = ['Torched', 'Torching', 'Want to Torch'];

router.get(
	'/:userId',
	asyncHandler(async (req, res, next) => {
		let userShelves = await Kindling_Shelf.findAll({
			where: {
				user_id: req.params.userId,
			},
		});

		userShelves = userShelves.map(async shelf => {
			const shelf_books = await Kindling_Book.findAll({
				where: {
					kindling_shelf_id: shelf.id,
				},
			});
			const shelfBooksInfo = await shelf_books.map(async shelf_book => {
				let book = await Book.findOne({
					where: {
						book_id: shelf_book.id,
					},
				});
				bookInfo = await getBookInfo(book.google_book_id);
				return bookInfo;
			});
			shelf.books = shelfBooksInfo;
			return shelf;
		});

		return res.json(userShelves);
	})
);

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
		return res.json({ newShelf });
	})
);

module.exports = router;
