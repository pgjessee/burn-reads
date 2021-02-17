const express = require('express');
const asyncHandler = require('express-async-handler');
const { bookSearch, getBookInfo } = require('../../utils/bookApi');
const { Book, Burn, User } = require('../../db/models');

const router = express.Router();

router.get(
	'/splash',
	asyncHandler(async (req, res, next) => {
		const splashBooks = await Book.findAll({
			limit: 10,
		});

		return res.json({ splashBooks });
	})
);

router.get(
	'/search/:searchTerm/:pageNumber/:maxResults/:userId',
	asyncHandler(async (req, res) => {
		const { searchTerm, maxResults, pageNumber, userId } = req.params;
		books = await bookSearch(searchTerm, maxResults, pageNumber, userId);
		return res.json(books);
	})
);

router.get(
	'/:googleBookId/:userId',
	asyncHandler(async (req, res) => {
		const { googleBookId, userId } = req.params;

		let findBook = await Book.findOne({
			where: {
				google_book_id: googleBookId,
			},
		});
		let burns;

		if (findBook) {
			burns = await Burn.findAll({
				where: {
					book_id: findBook.id,
				},
				include: User,
				order: [["createdAt", "DESC"]]
			});
		} else {
			burns = [];
		}
		let book = await getBookInfo(googleBookId, userId);

		return res.json({ book, burns });
	})
);


router.get('/', asyncHandler (async(req, res) => {
	const books = await Book.findAll();

	return res.json({ books })
}))


module.exports = router;
