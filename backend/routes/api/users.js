const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie } = require('../../utils/auth')
const { User } = require('../../db/models')

const router = express.Router();


router.post('/', asyncHandler(async(req, res) => {
    const { first_name, email, zip, password} = req.body;

    const user = await User.signup({
        first_name,
        email,
        zip,
        password
    })

    setTokenCookie(res, user);

    return res.json({ user })

}))


module.exports = router;



