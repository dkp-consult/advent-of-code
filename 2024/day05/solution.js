const fs = require('fs');

// Lire les données d'entrée
const input = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n\n');

const [rulesData, updatesData] = input;

const rules = rulesData.split('\n').map(rule => rule.split('|').map(Number));
const updates = updatesData.split('\n').map(update => update.split(',').map(Number));

// Fonction pour vérifier si une mise à jour est déjà valide
const isUpdateValid = (update, rules) => {
    for (const [x, y] of rules) {
        const indexX = update.indexOf(x);
        const indexY = update.indexOf(y);

        if (indexX !== -1 && indexY !== -1 && indexX > indexY) {
            return false; // La règle n'est pas respectée
        }
    }
    return true; // Toutes les règles sont respectées
};

// Construire un graphe spécifique à une mise à jour
const buildGraphForUpdate = (update, rules) => {
    const graph = new Map();

    for (const [x, y] of rules) {
        if (update.includes(x) && update.includes(y)) {
            if (!graph.has(x)) graph.set(x, []);
            if (!graph.has(y)) graph.set(y, []);
            graph.get(x).push(y);
        }
    }

    return graph;
};

// Tri topologique spécifique à une mise à jour
const topologicalSort = (graph, pages) => {
    const inDegree = new Map();

    // Initialiser les degrés d'entrée
    graph.forEach((_, node) => inDegree.set(node, 0));
    graph.forEach((neighbors) => {
        for (const neighbor of neighbors) {
            inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
        }
    });

    // Trouver les pages avec un degré d'entrée nul
    const queue = pages.filter(page => (inDegree.get(page) || 0) === 0);
    const sorted = [];

    while (queue.length) {
        const node = queue.shift();
        sorted.push(node);

        for (const neighbor of (graph.get(node) || [])) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0 && pages.includes(neighbor)) {
                queue.push(neighbor);
            }
        }
    }

    // Vérifier si le tri est complet
    if (sorted.length !== pages.length) {
        console.warn("Tri incomplet. Pages restantes :", pages.filter(page => !sorted.includes(page)));
        return null;
    }

    return sorted;
};

// Partie 1 : Calculer la somme des médianes des mises à jour valides
const part1 = () => {
    let sumOfMiddles = 0;

    for (const update of updates) {
        if (isUpdateValid(update, rules)) {
            const middleIndex = Math.floor((update.length - 1) / 2);
            sumOfMiddles += update[middleIndex];
        }
    }

    return sumOfMiddles;
};

// Partie 2 : Réordonner les mises à jour invalides et calculer la somme des médianes
const part2 = () => {
    let sumOfMiddles = 0;

    for (const update of updates) {
        if (isUpdateValid(update, rules)) {
            // Ignorer les mises à jour valides
            continue;
        }

        // Construire un graphe spécifique à la mise à jour
        const graph = buildGraphForUpdate(update, rules);
        const sortedUpdate = topologicalSort(graph, update);

        if (!sortedUpdate) {
            console.warn("Impossible de trier cette mise à jour :", update);
            continue; // Passer à l'itération suivante
        }

        const middleIndex = Math.floor((sortedUpdate.length - 1) / 2);
        sumOfMiddles += sortedUpdate[middleIndex];
    }

    return sumOfMiddles;
};

console.log("Part 1:", part1());
console.log("Part 2:", part2());