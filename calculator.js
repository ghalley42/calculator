import { buttonsContent, operatorKeys, operatorFunctions } from "./contentModule.js"

const keyPad = document.querySelector('div.keypad');
const display = document.querySelector('div.display');

let tempString = '';
let calculateThis = [];
let operatorPressed = false;

const handleKeypadClick = (click) => {
    if ( operatorKeys.some((e) => e == click.target.id) ) handleOperator(click.targer.id) //{
    //     calculateThis.push(tempString);
    //     tempString = '';
    //     operatorPressed = !operatorPressed;
    //     return tempString += click.target.id;
    // }
    else {
        tempString += click.target.id;
        display.textContent = tempString;
    }
};

buttonsContent.forEach((button) => {
    let newButton = document.createElement('div');
    newButton.classList.add('btn');
    newButton.textContent = button.id;
    newButton.id = button.id;
    newButton.style.backgroundColor = button.color;
    if ( button.color != 'darkgray' ) newButton.style.color = 'white';
    keyPad.append(newButton);
    newButton.addEventListener('click', handleKeypadClick);
});

const handleOperator = (operator) => {
    
};

// Next steps:

//  - redo handleKeypadClick logic
//  - add function for '=' to do the Math
//  - figure out % math and how to calculate that. (maybe similar to =. Test on apple calculator and mimic logic.)
//  - 