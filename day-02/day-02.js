const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'data.txt')).toString();

const gamesInput = input
    .replace(/\r/g, "")
    .trim()
    .split("\n")
    .map((line) => line.split(" "));

var score = 0;

function moveScore() {
    if (myMove === 'X') {
        return score =+ 1
    } else if (myMove === 'Y') {
        return score =+ 2
    } else if (myMove === 'Z') {
        return score =+ 3
    };
}

const myMove = gamesInput[0][1];

console.log(moveScore(myMove));
// Parcourir le tableau de mouvement et incrémenter le score en fonction des valeurs de la fonction moveScore 

/*
A = Rock
B = Paper
C = Scissors
*/