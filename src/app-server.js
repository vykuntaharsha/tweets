const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const bodyParser = require('body-parser');
app.use(bodyParser.json({
    limit : '10kb',
    extended : true
}));

//setting the spacing of json
app.set('json spaces', 2);

//setting the app to serve files
const staticFiles = express.static('../client/build');
app.use(staticFiles);


const api = require('./api');
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  console.log('use Ctrl-C to stop this server');
});
