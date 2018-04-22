const router = require('express').Router();
const getUsers = require('./obtain-users');
const getUserByName = require('./get-user-by-name');
const getFeed = require('./obtain-feed');
const getFollowers = require('./obtain-followers');
const getFollwees = require('./obtain-followees');
const follow = require('./follow-user');
const getTweets = require('./obtain-tweets');
const getLikedTweets = require('./obtain-liked-tweets');
const getPopularUsers = require('./popular-users');
const followeeSuggestions = require('./followee-suggestions');
const verifyJWT = require('../auth/verify-jwt');


router.get('/', getUsers);
router.get('/popular_users', [verifyJWT, getPopularUsers]);
router.get('/user/:name', getUserByName);
router.get('/:name/feed', [verifyJWT, getFeed]);
router.get('/:name/followers', [verifyJWT, getFollowers]);
router.get('/:name/followee_suggestions', followeeSuggestions);
router.get('/:name/following', [verifyJWT, getFollwees]);
router.get('/:name/tweets', [verifyJWT, getTweets, getLikedTweets]);
router.post('/:name/follow', [verifyJWT,follow]);


module.exports = router;
