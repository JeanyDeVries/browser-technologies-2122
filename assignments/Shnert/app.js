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

let colorShirt;
let newData = "";
let userInfo;
let textShirtData;

app.get('/', function (req, res) {
	fs.readFile('shirts.json', 'utf8', function (err, data) {
		if (err) throw err;
		let shirtsData = JSON.parse(data);
	
		res.render('home', {
			shirts: shirtsData
			})
		});
  })

app.post('/', (req, res) => {
	let text;
	let info;

	colorShirt = JSON.stringify(req.body)
	fs.writeFile('colorShirt.json', colorShirt, 'utf8', cb => {
		console.log('shirt color not saved');
	});

	fs.readFile('infoUser.json', 'utf8', function (err, data) {
		if (err) throw err;
		info = JSON.parse(data);
	})
	fs.readFile('textShirt.json', 'utf8', function (err, data) {
		if (err) throw err;
		text = JSON.parse(data);
	})
	colorShirt = JSON.parse(colorShirt)

	setTimeout(function(){
		saveShirt(info, text, colorShirt, res);
	},50);
})


app.get('/makeShirtInfoUser', function (req, res) {
    res.render('makeShirtInfoUser', {})
})


app.get('/makeShirtText', function (req, res) {
	fs.readFile('textShirt.json', 'utf8', function (err, data) {
        if (err) throw err;
        let shirtsData = JSON.parse(data);
  
        res.render('makeShirtText', {
            textShirt: shirtsData
        })
      });
})

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
        textShirtData = JSON.parse(data);
  
        res.render('makeShirtColor', {
            textShirt: textShirtData
        })
      });
})

let userInputText;
app.post('/makeShirtColor', (req, res) => {
	userInputText = JSON.stringify(req.body)

	fs.writeFile('textShirt.json', userInputText, 'utf8', cb => {
		console.log('werk dan');
	});

	res.render('makeShirtColor', {
		//textShirt: userInputText
	})
})

function saveShirt(info, text, color, res) {
	var data = fs.readFileSync('shirts.json');
	var currentShirts = data;
	try {
		currentShirts = JSON.parse(data);
    } catch (e) {
		currentShirts = ''
    }

	newData = {firstName: 'test', lastName: 'test'}
	// newData = JSON.stringify(newData)

	console.log(currentShirts)

	currentShirts.shirts.push(newData);
	currentShirts = JSON.stringify(currentShirts)

	fs.writeFile('shirts.json', currentShirts, 'utf8', cb => {
		console.log('werk dan');
	});

	JSON.parse(currentShirts)

	res.render('home', {
		shirts: currentShirts
	})
  }
  

app.listen(port);