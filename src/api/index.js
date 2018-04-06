const apiRouter = require('express').Router();
const users = require('./users');
const auth = require('./auth');

apiRouter.use('/users', users);
apiRouter.use('/auth', auth);

module.exports = apiRouter;
