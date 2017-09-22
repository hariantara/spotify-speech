var express = require('express');
var router = express.Router();
var spotify = require('../controller/spotify')

router.post('/spotify/search', spotify.search)

module.exports = router;
