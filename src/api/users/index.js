const router = require('express').Router();
const getUsers = require('./obtain-users');
const getUserByName = require('./get-user-by-name');
const getFeed = require('./obtain-feed');
const getFollowers = require('./obtain-followers');
const followUser = require('./follow-user');
// const getFollowerRequests = require('./follower-requests');
// const followerSuggestions = require('./follower-suggestions');
const verifyJWT = require('../auth/verify-jwt');

router.get('/', getUsers);
router.get('/:name', getUserByName);
router.get('/:name/feed', [verifyJWT, getFeed]);
router.get('/:name/followers', getFollowers);
// router.get('/:name/follower_requests', getFollowerRequests);
// router.get('/:name/follower_suggestions', followerSuggestions);
// router.get('/:name/following', following);
// router.get('/:name/tweets', tweets);
// router.post('/:name/follow', requestToFollow);
// router.put('/:name/follow', updateFollowRequest);

module.exports = router;
