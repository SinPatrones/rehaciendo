const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("Entrado a página incial...");
    res.render('index');
});


module.exports = router;
