const router = require('express').Router();
const getTrendingHashtags = require('./obtain-trending-hashtags');
const getTweetsWithHashtag = require('./obtain-tweets');
const verifyJWT = require('../auth/verify-jwt');

router.get('/trending', getTrendingHashtags);
router.get('/:tag/tweets', [verifyJWT, getTweetsWithHashtag]);

module.exports = router;
