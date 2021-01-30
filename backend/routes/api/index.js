const express = require('express');


const router = express.Router();

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
})

module.exports = router;

