const router = require('express').Router();
const getTweet = require('./obtain-tweet');
const getTweets = require('./obtain-tweets');
const getComments = require('./obtain-comments');
const getReplies = require('./obtain-replies');
const getLikedUsers = require('./obtain-liked-users');
const createTweet = require('./create-tweet');
const createComment = require('./create-comment');
const likeTweet = require('./like-tweet');
const deleteTweet = require('./delete-tweet');
const updateTweet = require('./update-tweet');
const verifyJWT = require('../auth/verify-jwt');

router.get('/', getTweets);
router.get('/:id', getTweet);
router.get('/:id/comments', getComments);
router.get('/:id/comments/:parent/replies', getReplies);
router.get('/:id/liked-users', getLikedUsers);
router.post('/tweet', [verifyJWT, createTweet]);
router.post('/:id/comment', [verifyJWT, createComment]);
router.post('/:id/like', [verifyJWT, likeTweet]);
router.delete('/:id', [verifyJWT, deleteTweet]);
router.put('/:id', [verifyJWT, updateTweet]);

module.exports = router;
