import { buttonsContent, operatorKeys } from "./contentModule.js"

const keyPad = document.querySelector('div.keypad');
const display = document.querySelector('div.display');

let tempString = '';
let calculateThis = [];
let firstNumAdded = false;
let operatedYet = false;
let percentOperator = false;
let decimalAdded = false;

const handleKeypadClick = (click) => {
    let keyPressed = click.target.id;
    if ( operatorKeys.some((e) => e == keyPressed) ) {
        if ( keyPressed == '+/-') { handlePlusMinus(tempString); }
        else if ( keyPressed == 'AC' ) { clearButton(); }
        else { handleOperator(keyPressed, tempString, calculateThis) };
    }
   
    else {
        if ( tempString == '0' && keyPressed != '.' ) tempString = '';
        if ( keyPressed == '.' ) {
            keyPressed = decimalAdded ? '' : keyPressed;
            decimalAdded = true;
        }
        if ( tempString.length > 16 ) return;
        tempString += keyPressed;
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
    let num = Number(x);
    if ( num % Math.trunc(num) > 0 ) num = num.toFixed(14 - Math.trunc(num).toString().length);
    let newDisplayText = num.toString().length > 16 ? Number(x).toExponential(7) : num;
    display.style.fontSize = newDisplayText.length > 10 ? '2.5rem' : '4rem';
    display.textContent = newDisplayText;
}

const clearButton = () => {
    tempString = '';
    calculateThis = [];
    firstNumAdded = false;
    operatedYet = false;
    percentOperator = false;
    decimalAdded = false;
    updateDisplay('0');
}

const operatorFunctions = {
    '÷': (a, b) => a / b,
    'x': (a, b) => a * b,
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
};

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
}

const handleOperator = (x, str, arr) => {
    switch (x) {
        case '=':
            let result = operatorFunctions[arr[1]](arr[0], Number(str));
            updateDisplay(result.toString());
            setupNextOperation(result, x);
            break;
        case '<-':
            handleBackspace(str);
            break;
        case '%':
            if ( !firstNumAdded || percentOperator ) break;
            let pNum = (arr[1] == '*' || arr[1] == '%') ? str / 100 : arr[0] * (str / 100);
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

// Next steps:

//  - redo handleKeypadClick logic - SOLVED
//  - add function for '=' to do the Math - SOLVED
//  - figure out % math and how to calculate that. (maybe similar to =. Test on apple calculator and mimic logic.) - SOLVED
//  - add logic to continue math after operating - SOLVED
//  - fix logic for scientific notation
//  - fix logic for decimal truncator
//  - moved logic for scientfic notation and decimal truncator into separate function. Update display is not the appropriate place to do it.