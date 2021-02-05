const express = require('express');
const asyncHandler = require('express-async-handler');
const { bookSearch, getBookInfo } = require('../../utils/bookApi');
const { Book } = require('../../db/models');

const router = express.Router();

router.get(
	'/search/:searchTerm',
	asyncHandler(async (req, res) => {
		let { pageNumber, resultsShown } = req.body;
		books = await bookSearch(req.params.searchTerm, resultsShown, pageNumber);
		return res.json(books);
	})
);

router.get(
	'/:googleBookId',
	asyncHandler(async (req, res) => {
		let book = await getBookInfo(req.params.googleBookId);
		return res.json(book);
	})
);

module.exports = router;
