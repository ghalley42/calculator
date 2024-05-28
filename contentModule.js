
export { buttonsContent, operatorKeys, operatorFunctions }

const buttonsContent = [
    { 'id': 'AC',
        'color': "darkgray"}, 
    { 'id': '<-',
    'color': "darkgray"},
    { 'id': '+/-',
    'color': "darkgray"},, 
    { 'id': '%', 
    'color': "darkgray"},
    { 'id': '7', 
    'color': "#404648"},
    { 'id': '8', 
    'color': "#404648"},
    { 'id': '9', 
    'color': "#404648"},
    { 'id': '÷', 
    'color': "#e29128"},
    { 'id': '4', 
    'color': "#404648"},
    { 'id': '5', 
    'color': "#404648"},
    { 'id': '6', 
    'color': "#404648"},
    { 'id': 'x', 
    'color': "#e29128"},
    { 'id': '1', 
    'color': "#404648"},
    { 'id': '2', 
    'color': "#404648"},
    { 'id': '3', 
    'color': "#404648"},
    { 'id': '-', 
    'color': "#e29128"},
    { 'id': '0', 
    'color': "#404648"},
    { 'id': '.', 
    'color': "#404648"},
    { 'id': '=', 
    'color': "#e29128"},
    { 'id': '+',
    'color': "#e29128"}
];

const operatorKeys = ['AC', '<-', '+/-', '%', '÷', 'x', '-', '+', '='];

const operatorFunctions = {
    'AC': () => {
        tempString = '';
        calculateThis = [];
        operatorPressed = false;
    },
    '<-': (str) => str.length <= 1 ? '0' : str.substring(0, str.length - 1),
    '+/-': (num) => num = -num,
    '%': null, // need to figure out how to handle this case
    '÷': (a, b) => a / b,
    'x': (a, b) => a * b,
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '=': ''
};