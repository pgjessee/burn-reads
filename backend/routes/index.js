const express = require('express');
const app = require('../app');

const router = express.Router();

router.get('/hello/world', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken())
    res.send("<h1>HELLO WORLD!</h1>")
})

module.exports = router;


