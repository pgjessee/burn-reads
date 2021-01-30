const express = require('express');


const router = express.Router();

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
})

module.exports = router;

(async () => {
    let res = await fetch('/api/test', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "XSRF-TOKEN": `uif7JARb-Mkn8hufNkXQ5iTOiowtyQ8qqA2A`
        },
        body: JSON.stringify({ hello: 'world' })
    })

    let data = await res.json();
    console.log(data);
    return data;
})()
