const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'data.txt')).toString();

const gamesInput = input
    .replace(/\r/g, "")
    .trim()
    .split("\n")
    .map((line) => line.split(" "));

console.log(gamesInput);

// const rockAgainstPaper = gamesInput.filter(['A', 'Y'], gamesInput);

// console.log(filterItems(gamesInput, "A"));
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

//

