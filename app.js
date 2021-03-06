const express = require('express');
const http = require('http');
const fs = require('fs');
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;
const initRoutes = require('./routes/sms.routes');

global.__basedir = __dirname + '/';
initRoutes(app);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/index', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' })
    fs.createReadStream('index.html').pipe(res)
});

app.get('/success', (req, res) =>{
  fs.createReadStream('success.html').pipe(res)
})

app.use('/sms', require('./sms'));

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});