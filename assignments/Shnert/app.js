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

let colorShirt;
app.post('/', (req, res) => {
	colorShirt = JSON.stringify(req.body)

	fs.writeFile('colorShirt.json', colorShirt, 'utf8', cb => {
		console.log('shirt color not saved');
	});

	const path = './Shirts.json'

	var newData = "";
	try {
	  if (fs.existsSync(path)) {
		console.log("test")

		var data = fs.readFileSync("Shirts.json");
		var shirts = JSON.parse(data);
	
		shirt = {userInfo, textShirtData, colorShirt};
		shirt = JSON.stringify(shirt);

		shirts.push(shirt);
	}
	  else{
		newData = {userInfo, textShirtData, colorShirt};
		newData = JSON.stringify(newData)

		fs.writeFile('Shirts.json', newData, 'utf8', cb => {
			console.log('werk dan');
		});
	  }
	}catch(err) {
	  console.error(err)
	}

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



let textShirtData;
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
	userInputText = JSON.stringify(req.body.textShirt)

	fs.writeFile('textShirt.json', userInputText, 'utf8', cb => {
		console.log('werk dan');
	});

	res.render('makeShirtColor', {
		textShirt: userInputText
	})
})

app.listen(port);