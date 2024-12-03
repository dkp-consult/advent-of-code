const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8');

// Part 1 : Calculer la somme des multiplications simples
const part1 = () => {
    // Fonction pour multiplier deux nombres
    function mul(a, b) {
        return a * b;
    }

    // Extraire les correspondances avec la regex
    const matches = input.match(/mul\(\d+,\d+\)/gm);

    // Vérifier si des correspondances ont été trouvées
    if (!matches) {
        console.log("No matches found.");
        return 0; // Retourne 0 si aucune correspondance
    }

    // Appliquer la fonction `mul` à chaque correspondance
    const results = matches.map(match => {
        const [a, b] = match.match(/\d+/g).map(Number); // Extraire les nombres
        return mul(a, b); // Retourner le produit
    });

    // Calculer la somme des résultats
    const answer = results.reduce((acc, curr) => acc + curr, 0);

    return answer; // Retourner la réponse finale
};

/* 
    Étapes pour part1 :
    1. Définir la fonction `mul` pour multiplier deux facteurs.
    2. Utiliser une regex pour trouver les motifs `mul(...)` et les ajouter dans un tableau.
    3. Parcourir le tableau pour appliquer `mul` à chaque élément.
    4. Utiliser `reduce` pour additionner les résultats.
*/

// Part 2 : Calculer la somme en respectant les instructions "do()" et "don't()"
const part2 = () => {
    // Fonction pour multiplier deux nombres
    function mul(a, b) {
        return a * b;
    }

    // Extraire toutes les instructions pertinentes
    const matches = input.match(/do\(\)|don't\(\)|mul\(\d+,\d+\)/gm);

    // Vérifier si des correspondances ont été trouvées
    if (!matches) {
        console.log("No matches found.");
        return 0;
    }

    let enable = true; // Par défaut, mul est activé
    let results = []; // Stocker les résultats des multiplications

    // Parcourir les instructions dans l'ordre
    matches.forEach(match => {
        if (match === "do()") {
            enable = true; // Réactiver mul
        } else if (match === "don't()") {
            enable = false; // Désactiver mul
        } else if (enable && match.startsWith("mul")) {
            // Extraire les nombres et appliquer mul si activé
            const [a, b] = match.match(/\d+/g).map(Number);
            results.push(mul(a, b));
        }
    });

    // Calculer la somme des résultats
    const answer = results.reduce((acc, curr) => acc + curr, 0);

    return answer; // Retourner la réponse finale
};

/* 
    Étapes pour part2 :
    1. Définir la fonction `mul` pour multiplier deux facteurs.
    2. Utiliser une regex pour capturer "do()", "don't()" et "mul(...)".
    3. Maintenir l'état `enable` pour savoir si `mul` est activé.
    4. Appliquer `mul` uniquement si `enable` est vrai.
    5. Additionner les résultats pour obtenir la somme finale.
*/

// Exécuter et afficher les résultats
console.log("Part 1:", part1());
console.log("Part 2:", part2());