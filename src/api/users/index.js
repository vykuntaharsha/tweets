const router = require('express').Router();
const getUserByName = require('./get-user-by-name');
const createUser = require('./create-user');
const getUsers = require('./obtain-users');
const getFollowers = require('./obtain-followers');
const followUser = require('./follow-user');

router.get('/', getUsers);
router.get('/:name', getUserByName);
router.get('/:name/followers', getFollowers);
router.post('/:name/follower/:follower', followUser);
router.post('/user', createUser);

module.exports = router;
