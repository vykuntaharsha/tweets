const router = require('express').Router();
const verifyTwitterToken = require('./verify-twitter-token');
const authenticate = require('./authenticate');
const getRequestTokenFromTwitter = require('./request-token-from-twitter');
const verifyJWT = require('./verify-jwt');
const createJWT = require('./create-jwt');
const login = require('./login');
const logout = require('./logout');
const fetchTwitterProfile = require('./fetch-twitter-profile');
const fetchOrCreateUser = require('./fetch-or-create-user');

router.post('/request_token', getRequestTokenFromTwitter);
router.post('/authenticate', [verifyJWT, authenticate]);
router.post('/login', [verifyTwitterToken, fetchTwitterProfile, fetchOrCreateUser, createJWT, login]);
router.post('/logout', [verifyJWT, logout]);
module.exports = router;
