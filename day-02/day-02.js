const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'data.txt')).toString();

console.log(input)

/* 

myOpposant [
    A = Rock
    B = Paper
    C = Scissors
]

mySelf [ 
    X = Rock = 1
    Y = Paper = 2
    Z = Scissors = 3
]

Win = 6
Draw = 3
Lost = 0 */

const score =
[   X = 1,
    Y = 2,
    Z = 3
]
console.log(score)