const shirtText = document.getElementById("textShirt");
const shirtInputText = document.getElementById("textInputShirt");

if(shirtInputText){
    shirtInputText.addEventListener('input', (event) => {
        shirtText.textContent = event.target.value;
      });
}


const radioButtons = document.querySelectorAll('input[name="color"]');
const shirtMain1 = document.querySelector('.shirtMain1');
const shirtMain2 = document.querySelector('.shirtMain2');
const shirtMain3 = document.querySelector('.shirtMain3');

if(radioButtons){
    radioButtons.forEach(element => {
        element.addEventListener('click', () => {
            console.log(element.value)
            // In Internet Explorer 7 and earlier, setAttribute doesn't set styles and removes events when you try to set them.
            shirtMain1.setAttribute('fill', element.value)   
            shirtMain2.setAttribute('fill', element.value)   
            shirtMain3.setAttribute('fill', element.value)   
        })
    })
}