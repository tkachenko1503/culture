const express = require('express');
const mockData = require('./mock.json');

const PUBLIC_PATH = __dirname + '/dist/public';
const PAGES_PATH = __dirname + '/app/pages';

const app = express();

app.use(express.static(PUBLIC_PATH));

app.set('views', PAGES_PATH);
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', mockData);
});

app.use(function (err, req, res, next) {
  res.send(err.stack);
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
