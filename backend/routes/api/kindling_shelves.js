const express = require('express');
const asyncHandler = require('express-async-handler');
const { getBookInfo } = require('../../utils/bookApi');
const { Kindling_Shelf, Kindling_Book, Book, Burn } = require('../../db/models');

const router = express.Router();
const defaultShelfNames = ['Torched', 'Torching', 'Want to Torch'];

//gets all book and their info for each kindling shelf
router.get(
	'/:userId',
	asyncHandler(async (req, res, next) => {
		let kindlingShelves = await Kindling_Shelf.findAll({
			where: {
				user_id: req.params.userId,
			},
			include: {
				model: Book,
				include: Burn,
			},
		});
		fullKindlingShelves = await Promise.all(
			kindlingShelves.map(async kindlingShelf => {
				const books = kindlingShelf.Books;
				booksInfo = await Promise.all(
					books.map(async book => {
						burns = book.Burns;
						info = await getBookInfo(book.google_book_id);
						const avgRating = burns.reduce((avg, { rating }, idx, burns) => {
							return (avg += rating / burns.length);
						}, 0);
						info.rating = avgRating;
						info.book_id = book.id;
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

//add book to kindling shelf
router.post(
	'/:shelfId/:googleBookId',
	asyncHandler(async (req, res) => {
		const shelfId = req.params.shelfId;
		const googleBookId = req.params.googleBookId;

		let newKindlingBook = Kindling_Book.create({
			shelf_id: shelfId,
			google_book_id: googleBookId,
		});
		return res.json(newKindlingBook);
	})
);

//remove book from kindling shelf
router.patch(
	'/:shelfId/:googleBookId',
	asyncHandler(async (req, res) => {
		const shelfId = req.params.shelfId;
		const googleBookId = req.params.googleBookId;

		let kindlingBook = Kindling_Book.findOne({
			where: {
				shelf_id: shelfId,
				google_book_id: googleBookId,
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

module.exports = router;
