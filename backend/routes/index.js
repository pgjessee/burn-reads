const express = require('express');
const app = require('../app');

const apiRouter = require('./api/index');


const router = express.Router();

router.use('/api', apiRouter);

// router.get('/hello/world', (req, res) => {
//     res.cookie('XSRF-TOKEN', req.csrfToken())
//     res.send("<h1>HELLO WORLD!</h1>")
// })

module.exports = router;


