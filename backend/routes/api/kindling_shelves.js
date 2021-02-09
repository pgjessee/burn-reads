const express = require('express');
const asyncHandler = require('express-async-handler');
const { getBookInfo } = require('../../utils/bookApi');
const { Kindling_Shelf, Kindling_Book, Book } = require('../../db/models');

const router = express.Router();
const defaultShelfNames = ['Torched', 'Torching', 'Want to Torch'];

//gets all books for each shelf
router.get(
	'/:userId',
	asyncHandler(async (req, res, next) => {
		let kindlingShelves = await Kindling_Shelf.findAll({
			where: {
				user_id: req.params.userId,
			},
		});

		fullKindlingShelves = await Promise.all(
			kindlingShelves.map(async shelf => {
				const shelf_books = await Kindling_Book.findAll({
					where: {
						kindling_shelf_id: shelf.id,
					},
				});
				const shelfBooksInfo = await Promise.all(
					shelf_books.map(async shelf_book => {
						const book = await Book.findOne({
							where: {
								id: shelf_book.id,
							},
						});
						bookInfo = await getBookInfo(book.google_book_id);
						return bookInfo;
					})
				);
				shelfWithInfo = {
					id: shelf.id,
					shelf_name: shelf.shelf_name,
					user_id: shelf.user_id,
					books: shelfBooksInfo,
				};
				return shelfWithInfo;
			})
		);
		console.log(fullKindlingShelves);
		return res.json(fullKindlingShelves);
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
