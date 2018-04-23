const router = require('express').Router();
const getTweet = require('./obtain-tweet');
const getTweets = require('./obtain-tweets');
const getLikedUsers = require('./obtain-liked-users');
const createTweet = require('./create-tweet');
const likeTweet = require('./like-tweet');
const shareOnTwitter = require('./share-on-twitter');
const deleteTweet = require('./delete-tweet');
const updateTweet = require('./update-tweet');
const verifyJWT = require('../auth/verify-jwt');

router.get('/', getTweets);
router.get('/:id', getTweet);
router.get('/:id/liked-users', getLikedUsers);
router.post('/tweet', [verifyJWT, createTweet]);
router.post('/:id/like', [verifyJWT, likeTweet]);
router.post('/:id/share-on-twitter', [verifyJWT, shareOnTwitter]);
router.delete('/:id', [verifyJWT, deleteTweet]);
router.put('/:id', [verifyJWT, updateTweet]);

module.exports = router;
