const express = require('express');
const asyncHandler = require("express-async-handler");

const { Burn, Book } = require('../../db/models')

const router = express.Router();



router.get('/:googleBookId/:userId', asyncHandler(async (req, res, next) => {
    const googleBookId = req.params.googleBookId;
    const userId = parseInt(req.params.userId, 10);

    let findBook = await Book.findOne({
        where: {
            google_book_id: googleBookId
        }
    });

    const burn = await Burn.findOne({
        where: {
            book_id: findBook.id,
            user_id: userId
        }
    });

    if (!burn) return false;

    return true;

}));


router.get('/:googleBookId', asyncHandler(async (req, res) => {
    const googleBookId = req.params.googleBookId;

    let findBook = await Book.findOne({
        where: {
            google_book_id: googleBookId
        }
    });

    const burns = await Burn.findAll({
        where: {
            book_id: findBook.id
        }
    });

    return res.json({ burns })

}));


router.post('/:googleBookId/:userId', asyncHandler(async (req, res, next) => {
    const googleBookId = req.params.googleBookId;
    const userId = parseInt(req.params.userId, 10);


    const { review, rating } = req.body;
    let burn;

    let findBook = await Book.findOne({
        where: {
            google_book_id: googleBookId
        }
    });

    if (!findBook) {

        await Book.create({ google_book_id: googleBookId });

        findBook = await Book.findOne({
            where: {
                google_book_id: googleBookId
            }
        });

        burn = await Burn.create({
            book_id: findBook.id,
            user_id: userId,
            review,
            rating
        });

        return res.json({ burn })
    };

    burn = await Burn.create({
        book_id: findBook.id,
        user_id: userId,
        review,
        rating
    });

    return res.json({ burn });

}));


router.put('/:googleBookId/:userId', asyncHandler(async (req, res) => {
    const googleBookId = req.params.googleBookId;
    const userId = parseInt(req.params.userId, 10);
    const { review, rating } = req.body;

    let findBook = await Book.findOne({
        where: {
            google_book_id: googleBookId
        }
    });

    let burn = await Burn.findOne({
        where: {
            book_id: findBook.id,
            user_id: userId
        }
    });

    burn = await burn.update({
        review,
        rating
    })

    return res.json({ burn })
}));


router.delete('/:googleBookId/:userId', asyncHandler(async (req, res) => {
    const googleBookId = req.params.googleBookId;
    const userId = parseInt(req.params.userId, 10);
    const { review, rating } = req.body;

    let findBook = await Book.findOne({
        where: {
            google_book_id: googleBookId
        }
    });

    let burn = await Burn.findOne({
        where: {
            book_id: findBook.id,
            user_id: userId
        }
    });

    burn = await burn.destroy()

    return res.json({ burn })

}));


module.exports = router;
