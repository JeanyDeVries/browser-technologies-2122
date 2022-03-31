const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));

app.get('/', function (req, res) {
    res.render('home', {

    })
  })

app.get('/makeShirtInfoUser', function (req, res) {
    res.render('makeShirtInfoUser', {

    })
})

app.get('/makeShirtText', function (req, res) {
    res.render('makeShirtText', {

    })
})

app.get('/makeShirtColor', function (req, res) {
    res.render('makeShirtColor', {

    })
})

app.listen(port);