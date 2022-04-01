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
    res.render('home', {})
  })


app.get('/makeShirtInfoUser', function (req, res) {
    res.render('makeShirtInfoUser', {})
})


app.get('/makeShirtText', function (req, res) {
    res.render('makeShirtText', {})
})

let userInfo;
app.post('/makeShirtText', (req, res) => {
	userInfo = JSON.stringify(req.body)

	fs.writeFile('infoUser.json', userInfo, 'utf8', cb => {
		console.log('werk dan');
	});

	res.render('makeShirtText', {})
})




app.get('/makeShirtColor', function (req, res) {

    fs.readFile('textShirt.json', 'utf8', function (err, data) {
        if (err) throw err;
        let textShirtData = JSON.parse(data);
  
        res.render('makeShirtColor', {
            textShirt: textShirtData
        })
      });
})

let userInputText;
app.post('/makeShirtColor', (req, res) => {
	userInputText = JSON.stringify(req.body.textShirt)

	fs.writeFile('textShirt.json', userInputText, 'utf8', cb => {
		console.log('werk dan');
	});

	res.render('makeShirtColor', {
		textShirt: userInputText
	})
})

app.listen(port);