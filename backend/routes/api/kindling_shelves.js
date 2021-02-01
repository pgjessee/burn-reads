const express = require('express');
const asyncHandler = require('express-async-handler');

const { Kindling_Shelf } = require('../../db/models')

const router = express.Router();


router.post("/new-user", asyncHandler(async(req, res, next) => {
    const { shelf_name, user_id } = req.body;

    const newShelf = await Kindling_Shelf.create({
        shelf_name,
        user_id
    })

    return res.json({ newShelf })
}))


module.exports = router;
