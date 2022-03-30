const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));

app.get('/', function (req, res) {
    res.render('home', {

    })
    //.catch(err => res.send(err))
  })

app.listen(port);