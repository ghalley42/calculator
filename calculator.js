import { buttonsContent, operatorKeys } from "./contentModule.js"

// Select Key Elements
const keyPad = document.querySelector('div.keypad');
const display = document.querySelector('div.display');
const validKeys = [...buttonsContent.map((button) => button.id), 'Enter', 'Escape', 'Backspace']

// Define functions for basic operators
const operatorFunctions = {
    '÷': (a, b) => a / b,
    'x': (a, b) => a * b,
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
};

// Define control variables
let tempString = '';
let calculateThis = [];
let firstNumAdded = false;
let operatedYet = false;
let percentOperator = false;
let decimalAdded = false;
let resetDisplayToggle = false;

// Define logic for handling user inputs
const handleKeypadClick = (click) => {
    if (!validKeys.some((key) => key == click.key || key == click.target.id)) return;
    let keyPressed = convertKeypress(validKeys.some((button) => button == click.key) ? click.key : click.target.id);
   
    if ( operatorKeys.some((e) => e == keyPressed) ) {
        if ( keyPressed == '+/-') { handlePlusMinus(tempString); }
        else if ( keyPressed == 'AC' ) { clearButton(); }
        else { handleOperator(keyPressed, tempString, calculateThis) };
    }
    else {
        if ( tempString == '0' && keyPressed != '.' || resetDisplayToggle && keyPressed != '.' ) {
            tempString = '';
            resetDisplayToggle = !resetDisplayToggle;
        }
        if ( keyPressed == '.' ) {
            keyPressed = decimalAdded ? '' : keyPressed;
            decimalAdded = true;
        }
        if ( tempString.length > 16 ) return;
        tempString += keyPressed;
        updateDisplay(tempString);
    }
};

const convertKeypress = (x) => {
    let theKey = x;
        switch (theKey) {
        case 'Enter':
            theKey = '=';
            break;
        case 'Escape':
            theKey = 'AC';
            break;
        case 'Backspace':
            theKey = '<-';
    }
    return theKey;
}

// Define logic for updating the display
const updateDisplay = (x) => {
    display.style.fontSize = x.length > 10 ? '2.3rem' : '4rem';
    display.textContent = x;
}

const formatNumForDisplay = (x) => {
    let num = Number(x);
    if ( num % Math.trunc(num) > 0 ) num = num.toFixed(4);
    return num.toString().length > 14 ? num.toExponential(7).toString() : parseFloat(num).toString();
}

// Define logic for resetting calculator
const clearButton = () => {
    tempString = '';
    calculateThis = [];
    firstNumAdded = false;
    operatedYet = false;
    percentOperator = false;
    decimalAdded = false;
    updateDisplay('0');
}

// Define logic for calculator operations
const acceptFirstArgument = (num, operator) => {
    if ( firstNumAdded ) return;
    calculateThis.push(num, operator);
    firstNumAdded = !firstNumAdded;
    tempString = '';
};

const setupNextOperation = (num, operator) => {
    if ( operator == "=" ) {
        calculateThis = [];
        tempString = num;
        firstNumAdded = false;
    }
    else {
        calculateThis = operator == undefined ? [num] : [num, operator];
        tempString = '';
        }
    operatedYet = true;
    percentOperator = false;
    resetDisplayToggle = true;
}

const handlePercent = (array, string) => {
    if ( array[1] == '%' || array[1] == 'x' ) return string / 100;
    return array[0] * string / 100;
}

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

// Define main operator logic
const handleOperator = (x, str, arr) => {
    switch (x) {
        case '=':
            if (!firstNumAdded) break;
            let result = operatorFunctions[arr[1]](arr[0], Number(str));
            updateDisplay(formatNumForDisplay(result));
            setupNextOperation(result, x);
            break;
        case '<-':
            handleBackspace(str);
            break;
        case '%':
            if ( !firstNumAdded || percentOperator ) break;
            console.log(arr, str)
            let pNum = handlePercent(arr, str);
            updateDisplay(pNum.toString());
            tempString = pNum;
            percentOperator = true;
            break;
        default:
           if ( !firstNumAdded ) { 
                    acceptFirstArgument(Number(str), x);
                    break;
            }

            else {
                    let nextResult = operatorFunctions[arr[1]](arr[0], Number(str));
                    setupNextOperation(nextResult, x);
                    updateDisplay(nextResult.toString());
            }
        }
};

//create UI, add to DOM, and set input event listeners
window.addEventListener('keyup', handleKeypadClick);

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