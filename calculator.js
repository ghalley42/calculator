import { buttonsContent, operatorKeys } from "./contentModule.js"

const keyPad = document.querySelector('div.keypad');
const display = document.querySelector('div.display');

let tempString = '';
let calculateThis = [];
let firstNumAdded = false;

const handleKeypadClick = (click) => {
    if ( operatorKeys.some((e) => e == click.target.id) ) {
        if ( click.target.id == '+/-') { handlePlusMinus(tempString); }
        else if ( click.target.id == 'AC' ) { clearButton(); }
        else {handleOperator(click.target.id, tempString, calculateThis);}
    }
   
    else {
        if ( tempString == '0' ) tempString = '';
        tempString += click.target.id;
        updateDisplay(tempString);
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

const handlePlusMinus = (str) => {
    tempString = -str + '';
    updateDisplay(tempString);
}

const handleBackspace = (str) => {
    str = str.length <= 1 ? '0' : str.substring(0, str.length - 1);
    if (str == '-' ) str = '0';
    tempString = str;
    updateDisplay(tempString);
}

const updateDisplay = (x) => {
    display.textContent = x;
}

const clearButton = () => {
    tempString = '';
    calculateThis = [];
    firstNumAdded = false;
    updateDisplay('0');
}

const operatorFunctions = {
    '%': null, // need to figure out how to handle this case
    '÷': (a, b) => a / b,
    'x': (a, b) => a * b,
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
};

const acceptFirstArgument = (num, operator, arr) => {
    if ( arr[1] ) return;
    calculateThis.push(num, operator);
    firstNumAdded = true;
    tempString = '';
    console.log(calculateThis);
}

const handleOperator = (x, str, arr) => {
    switch (x) {
        case '=':

            updateDisplay(operatorFunctions[arr[1]](arr[0], Number(str)));
            break;
        case '<-':
            handleBackspace(str);
            break;
        default:
            acceptFirstArgument( Number(str), x, arr );

    }
};

// Next steps:

//  - redo handleKeypadClick logic - SOLVED
//  - add function for '=' to do the Math 
//  - figure out % math and how to calculate that. (maybe similar to =. Test on apple calculator and mimic logic.)
//  - 