const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'data.txt')).toString();

const elfCalories = input

    .split('\n\r')
    .map(elf => {
        return elf 
           .split('\n')
            .reduce((total, current) => total + Number(current.trim()), 0);
    })


const elfCaloriesAnswer = elfCalories.map(Number);
const max = elfCaloriesAnswer.reduce((a, b) => Math.max(a,b), -Infinity);
const allAnswer = elfCaloriesAnswer.sort();
const lastAnswer = allAnswer[allAnswer.length - 1];
const lastAnswerTwo = allAnswer[allAnswer.length - 2];
const lastAnswerThree = allAnswer[allAnswer.length - 3];
const finalAnswer = (lastAnswer + lastAnswerTwo + lastAnswerThree);

console.log(lastAnswer)
console.log(finalAnswer)
console.log(elfCalories)
