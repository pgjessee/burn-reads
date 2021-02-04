const express = require('express');
const asyncHandler = require('express-async-handler');

const { Kindling_Shelf } = require('../../db/models');

const router = express.Router();
const defaultShelfNames = ['Torched', 'Torching', 'Want to Torch'];

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

router.post(
	'/shelves',
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
