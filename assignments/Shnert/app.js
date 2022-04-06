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
let textShirt;
let genderUser;
let sizeUser;


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
	let gender;
	let size;


	colorShirt = JSON.stringify({color: req.body.color})
	fs.writeFile('colorShirt.json', colorShirt, 'utf8', cb => {
		console.log('shirt color not saved');
		colorShirt = JSON.parse(colorShirt);
	});

	fs.readFile('size.json', 'utf8', function (err, data) {
		if (err) throw err;
		size = JSON.parse(data);
	})
	fs.readFile('gender.json', 'utf8', function (err, data) {
		if (err) throw err;
		gender = JSON.parse(data);
	})
	fs.readFile('textShirt.json', 'utf8', function (err, data) {
		if (err) throw err;
		text = JSON.parse(data);
	})

	setTimeout(function(){
		saveShirt(gender, size, text, colorShirt, res);
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
	genderUser = JSON.stringify({gender: req.body.gender})
	sizeUser = JSON.stringify({size: req.body.size})

	fs.writeFile('gender.json', genderUser, 'utf8', cb => {
		console.log('werk dan');
	});

	fs.writeFile('size.json', sizeUser, 'utf8', cb => {
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

app.post('/makeShirtColor', (req, res) => {
	textShirt = JSON.stringify({text: req.body.textShirt})

	fs.writeFile('textShirt.json', textShirt, 'utf8', cb => {
		console.log('werk dan');
	});

	res.render('makeShirtColor', {})
})

function saveShirt(genderUser, sizeUser, textShirt, colorShirt, res) {
	var data = fs.readFileSync('shirts.json');
	var currentShirts = data;
	try {
		currentShirts = JSON.parse(data);
    } catch (e) {
		currentShirts = ''
    }


	newData = {gender: genderUser, size: sizeUser, text: textShirt, color: colorShirt}
	// newData = JSON.stringify(newData)

	console.log(newData)

	currentShirts.shirts.push(newData);
	currentShirts = JSON.stringify(currentShirts)

	fs.writeFile('shirts.json', currentShirts, 'utf8', cb => {
		console.log('werk dan');
	});

	//JSON.parse(currentShirts)

	res.render('home', {
		shirts: currentShirts
	})
  }
  

app.listen(port);