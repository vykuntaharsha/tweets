const router = require('express').Router();
const verifyJWT = require('../auth/verify-jwt');
const createComment = require('./create-comment');
const getComments = require('./obtain-comments');
const createReply = require('./create-reply');
const getReplies = require('./obtain-replies');

router.get('/tweet/:id', getComments);
router.get('/:commentId/replies', getReplies);
router.post('/tweet/:id', [verifyJWT, createComment]);
router.post('/:commentId/reply', [verifyJWT, createReply]);

module.exports = router;
