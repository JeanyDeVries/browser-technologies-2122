# Browser Technologies @cmda-minor-web 20-21

## Table of Contents
- [Description](#description)
- [Clone repo](#Clone)
- [Wireframe](#Wireframe)
- [Core functionality](#Core)
  - [Code explanation](#Code)
- [Browsers](#Browsers)
- [Issues](#Issues)

## Description
> I want to be able to design, save and order my own t-shirt-with-nerdy-text and be able to do this as well when I'm reopening the site. 


This is the user story of the assignment. I'm making this app accessible on as many 'standard' browsers. I will also let the app work without javascript and CSS for the people who turn this off. 
The main point of this assignment is to make it accessible for as many people. This means to make it work on many browsers and check if some features are supported or not plus make the core functionality work without javascript and css

## Clone repo <a name="Clone">
```
  $ git clone https://github.com/JeanyDeVries/browser-technologies-2122.git
```

## Wireframe <a name="Wireframe">
  
## Core functionality <a name="Core">
I made everything work without any javascript and css. The only thing I used was the app.js and pure html (with handlebars) plus I made use of json files. 

https://user-images.githubusercontent.com/44086608/167272806-9e860fb5-a5b1-470a-8649-8fb93a9cadfb.mp4

  
### Code explanation <a name="Code">
To make the core functionality work I used the post and get methods from the form element in html. I used the method POST and added a input which submits the value of the text of the shirt in this case, see code below. 
  
```
    <form method="post" enctype="application/x-www-form-urlencoded" action="/makeShirtColor">
        <h3>Text</h3>
        <label for="text">
            <input class="textInput" id = "textInputShirt" type="text" value="{{textShirt}}" name="textShirt" required>
        </label><br>

        <input class="buttonInput" type="button" onclick="history.back();" value="Back">

        <a href="/makeShirtColor">
            <input class="buttonInput" type="submit" value="Next">
        </a>
    </form>
```
  
The nice thing about the POST method is that we can access the response from the POST in the app.js, see code below. You can see at that I get the variable colorshirt with the request method from the post. Then I get the variable color, which is seen in the request because of the name of the input. This way I can access the input values from the html to the app.js. I also write the value to a json file so I can later read it to access the variable. 
  
```
    app.post('/', (req, res) => {
    let text;
    let gender;
    let size;


    colorShirt = JSON.stringify({color: req.body.color})
    fs.writeFile('colorShirt.json', colorShirt, 'utf8', cb => {
      console.log('shirt color not saved');
      colorShirt = JSON.parse(colorShirt);
    });
```

When we go to a set we have the GET request of the site. We then want to display the data we got before, which in this case is all the shirts we have made. Therefore I have made the json files. I can read the json files, parse them so they can be read and or not stringified, and give the data to the handlebar page. I then use the variable given with javascript.
  
```
  app.get('/', function (req, res) {
  fs.readFile('shirts.json', 'utf8', function (err, data) {
    if (err) throw err;
    let shirtsData = JSON.parse(data);

    res.render('home', {
      shirts: shirtsData.shirts
      })
    });
  })
```
  
## Browsers <a name="Browsers">
  
## Issues <a name="Issues">
If you see any issues in my code or spots that need improvements let me know. You can file an issue in this repository. Thank you!

