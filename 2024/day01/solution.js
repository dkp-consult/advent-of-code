const fs = require('fs');

// Lecture de l'input depuis un fichier
const input = fs.readFileSync('./input.txt', 'utf-8');

// Initialisation des listes gauche et droite
const leftList = [];
const rightList = [];

/* 1. Séparer l'input en deux listes */
input.trim().split('\n').forEach(line => {
    // Diviser chaque ligne en deux nombres
    const [left, right] = line.split(/\s+/).map(Number);
    leftList.push(left);
    rightList.push(right);
});

/* 2. Trier les deux listes en ordre croissant */
leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

/* 3. Part 1: Calculer la distance totale entre les deux listes */
const part1 = () => {
    let totalDistance = 0;

    // Calculer la somme des différences absolues
    for (let i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    return totalDistance;
};

/* 4. Part 2: Calculer le similarity score */
const part2 = () => {
    const calculateSimilarityScore = (leftList, rightList) => {
        // Pré-calculer les occurrences des éléments dans rightList
        const occurrences = new Map();
        rightList.forEach(num => {
            occurrences.set(num, (occurrences.get(num) || 0) + 1);
        });

        // Calculer le similarity score
        let similarityScore = 0;
        leftList.forEach(num => {
            const countInRight = occurrences.get(num) || 0; // Nombre d'occurrences
            similarityScore += num * countInRight; // Ajouter au score
        });

        return similarityScore;
    };

    // Appeler la fonction pour calculer le similarity score
    return calculateSimilarityScore(leftList, rightList);
};

/* 5. Afficher les résultats */
console.log("Part 1 - Total Distance:", part1());
console.log("Part 2 - Similarity Score:", part2());