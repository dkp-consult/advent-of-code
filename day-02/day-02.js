const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'data.txt')).toString();

const gamesInput = input
    .replace(/\r/g, "")
    .trim()
    .split("\n")
    .map((line) => line.split(" "));

/* My methode, but I can't finish that challenge, I hate that... 

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

var myMove = gamesInput[2][1];



// Pour gamesInput[n][1] appeller la fonction moveScore et incrémenter la variable score pour compter le nombre de points

*/ 


