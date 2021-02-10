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
	'/search/:searchTerm/:pageNumber/:maxResults',
	asyncHandler(async (req, res) => {
		const { searchTerm, maxResults, pageNumber } = req.params;
		books = await bookSearch(searchTerm, maxResults, pageNumber);
		return res.json(books);
	})
);

router.get(
	'/:googleBookId',
	asyncHandler(async (req, res) => {
		const googleBookId = req.params.googleBookId;
		let book = await getBookInfo(googleBookId);

		let findBook = await Book.findOne({
			where: {
				google_book_id: googleBookId,
			},
		});

		if (!findBook) return res.json({ book, burns: [] });

		const burns = await Burn.findAll({
			where: {
				book_id: findBook.id,
			},
			include: User,
		});
		return res.json({ book, burns });
	})
);

module.exports = router;
