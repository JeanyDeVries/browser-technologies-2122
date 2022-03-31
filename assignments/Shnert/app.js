import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from "body-parser";
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

// Hierdoor kan ik CSS en JS bestanden aan de client side uitlezen
app.use(express.static('public'));

// Gebruik template engine handlebars voor DYNAMISCHE content
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'public/views');

// Gebruik body-parser om te lezen wat er in POST requests van de form staat
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


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