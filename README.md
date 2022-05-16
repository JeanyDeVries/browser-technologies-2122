# Browser Technologies @cmda-minor-web 20-21

## Table of Contents
- [Description](#description)
- [Clone repo](#Clone)
- [Wireframe](#Wireframe)
- [Core functionality](#Core)
  - [Code explanation](#Code)
- [Support](#Support)
- [Browsers](#Browsers)
  - [Chrome](#Chrome)
  - [Safari](#Safari)
  - [Safari IOS](#IOS)
  - [Firefox](#Firefox)
  - [Internet Explorer](#IE)
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
  
## Support  <a name="Support">
  
## Browsers <a name="Browsers">
To make the site accesability for every users, we need it to work on every browser. I made a list of every browser I where I want the app to work. 
  
  ### Chrome <a name="Chrome">
  Chrome is the browser I worked on to make the app. You can see this as the "perfect" browser. Everything is supported. 
   
  ### Safari <a name="Safari">
  Safari on the other hand is a bit more difficult. A lot is not supported. I use the older version 5.1.4. This is how it looks now:
  <img src="https://user-images.githubusercontent.com/44086608/168582491-711a8f22-6561-4728-8e89-7996adc0d76f.png" width="400">
  <img src="https://user-images.githubusercontent.com/44086608/168582578-fda23cef-ce9f-44ce-a9f1-07737f027073.png" width="400">
  
  A few things are going wrong. First the background is not white. After checking the main/html and * are not supported for css so I have to make a work-around. Flex is also not supported, but as a default it goes back to inline block which works as well. I can make a fallback just to make sure it works. The last thing is that svg's are not working correctly. After checking the support, I think it goes wrong because I use viewboxes, sadly that isn't supported very greatly. 
  
To make sure I get the inline block if flex is not supported, I added a fallback with a display: inline block. 
  ```
    @supports not (display: flex) {
      main {
        display: inline-block;
      }
    }
  
    @supports not (display: flex) {
      form div {
        display: inline-block;
      }
    }
  ```


  
  ### Safara IOS <a name="IOS">
  
  ### Firefox <a name="Firefox">
  
  ### Internet explorer <a name="IE">
  
## Issues <a name="Issues">
If you see any issues in my code or spots that need improvements let me know. You can file an issue in this repository. Thank you!

