const router = require('express').Router();
// const getHashtags = require('./obtain-hashtags');
const getTrendingHashtags = require('./obtain-trending-hashtags');
// const getTweetsWithHashtag = require('./obtain-tweets');
//
//
// router.get('/', getHashtags);
router.get('/trending', getTrendingHashtags);
// router.get(':id/tweets', getTweetsWithHashtag);

module.exports = router;
