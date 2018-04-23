const express = require('express');
require('env2')('.env');
const bodyParser = require('body-parser');
const staticFiles = express.static('../client/build');
const mongoose = require('mongoose');
const api = require('./api');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('json spaces', 2);
app.use(staticFiles);
const config = require('./config');
try {
    const mongodbURI = `mongodb://${config.mongodbUser}:${config.mongodbPassword}@ds141088.mlab.com:41088/heroku_9f4l79f2`
    mongoose.connect(mongodbURI);
} catch (e) {
    mongoose.connect('mongodb://localhost/tweets');
}

mongoose.Promise = global.Promise;

app.use( bodyParser.urlencoded({extended: true}) );
app.use( bodyParser.json({extended : true}) );

app.use('/api', api);

app.use(function(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
      res.status(err.status).send({message:err.message});
      return;
    }
 next();
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  console.log('use Ctrl-C to stop this server');
});
