const fs = require('fs');

const inputs = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');

const part1 = () => {


    // 1. Séparer les éléments de l'input la réponse est à gauche séparée avec ':' et les termes à utiliser son à droite séparés par des espaces
    // 2. Initialiser une variable pour stocker la somme des réponses
    // 3. Pour chaque combinaison possible des éléments de l'input:
    //    a. Calculer la réponse en multipliant ou additionnant les termes de gauche à droite
    //    b. Valider ou infirmer la réponse obtenue
    //    c. Si la réponse est validée, l'ajouter à la somme des réponses
    // 4. Retourner la somme des réponses validées comme réponse à l'exercice 



    function calculateSumOfValidatedAnswers(inputs) {
        let totalSum = 0; // Variable pour stocker la somme des réponses validées

        // Pour chaque entrée dans les inputs
        inputs.forEach(input => {
            const [expectedAnswer, termsString] = input.split(':'); // Séparer la réponse et les termes
            const expected = parseInt(expectedAnswer.trim()); // La réponse attendue (à gauche)
            const terms = termsString.trim().split(' ').map(Number); // Les termes (à droite), convertis en nombres

            // Générer toutes les combinaisons possibles des termes avec des opérateurs
            const validAnswers = generateCombinationsAndValidate(terms, expected);

            // Ajouter les réponses validées à la somme totale
            if (validAnswers) {
                totalSum += expected; // Ajouter seulement si une réponse est validée
            }
        });
        return totalSum; // Retourner la somme des réponses validées
    }

    // Fonction pour générer toutes les combinaisons des termes et valider la réponse

    function generateCombinationsAndValidate(terms, expected) {
        const operators = ['+', '*']; // Les opérateurs possibles
        const results = [];

        // Fonction récursive pour appliquer les opérateurs sur les termes
        function backtrack(currentValue, index) {
            if (index === terms.length) { // Si tous les termes ont été utilisés
                results.push(currentValue); // Ajouter le résultat au tableau
                return;
            }

            for (let operator of operators) {
                if (operator === '+') {
                    backtrack(currentValue + terms[index], index + 1);
                } else if (operator === '*') {
                    backtrack(currentValue * terms[index], index + 1);
                }
            }
        }

        // Lancer la recherche depuis le premier terme
        backtrack(terms[0], 1);

        // Vérifier si un des résultats correspond à la réponse attendue
        return results.includes(expected);
    }

    const totalSum = calculateSumOfValidatedAnswers(inputs);

    return totalSum;

};

const part2 = () => {
    // On conserve la logique précédente et on ajoute la concaténation des termes pour résoudre l'exercice dans certains cas

    function calculateSumOfValidatedAnswers(inputs) {
        let totalSum = 0; // Variable pour stocker la somme des réponses validées

        // Pour chaque entrée dans les inputs
        inputs.forEach(input => {
            const [expectedAnswer, termsString] = input.split(':'); // Séparer la réponse et les termes
            const expected = parseInt(expectedAnswer.trim()); // La réponse attendue (à gauche)
            const terms = termsString.trim().split(' ').map(Number); // Les termes (à droite), convertis en nombres

            // Générer toutes les combinaisons possibles des termes avec des opérateurs
            const validAnswers = generateCombinationsAndValidate(terms, expected);

            // Ajouter les réponses validées à la somme totale
            if (validAnswers) {
                totalSum += expected; // Ajouter seulement si une réponse est validée
            }
        });
        return totalSum; // Retourner la somme des réponses validées
    }

    // Fonction pour générer toutes les combinaisons des termes et valider la réponse

    function generateCombinationsAndValidate(terms, expected) {
        const operators = ['+', '*', '||']; // Les opérateurs possibles
        const results = [];

        // Fonction récursive pour appliquer les opérateurs sur les termes
        function backtrack(currentValue, index) {
            if (index === terms.length) { // Si tous les termes ont été utilisés
                results.push(currentValue); // Ajouter le résultat au tableau
                return;
            }

            for (let operator of operators) {
                if (operator === '+') {
                    backtrack(currentValue + terms[index], index + 1);
                } else if (operator === '*') {
                    backtrack(currentValue * terms[index], index + 1);
                } else if (operator === '||') {
                    backtrack(parseInt(currentValue.toString() + terms[index].toString()), index + 1);
                }
            }
        }

        // Lancer la recherche depuis le premier terme
        backtrack(terms[0], 1);

        // Vérifier si un des résultats correspond à la réponse attendue
        return results.includes(expected);
    }

    const totalSum = calculateSumOfValidatedAnswers(inputs);

    return totalSum;

    
};

console.log("Part 1:", part1());
console.log("Part 2:", part2());