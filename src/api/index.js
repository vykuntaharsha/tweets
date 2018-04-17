const apiRouter = require('express').Router();
const users = require('./users');
const auth = require('./auth');
const tweets = require('./tweets');
const hashtags = require('./hashtags');

apiRouter.use('/users', users);
apiRouter.use('/auth', auth);
apiRouter.use('/tweets', tweets);
apiRouter.use('/hashtags', hashtags);

module.exports = apiRouter;
