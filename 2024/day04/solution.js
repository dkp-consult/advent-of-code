const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8');

const part1 = () => {
    const grid = input.trim().split('\n'); // Transformer l'entrée en une grille (tableau 2D)

    const findXMAS = (grid) => {
        const word = "XMAS";
        const directions = [
            [0, 1], [0, -1], // Horizontal
            [1, 0], [-1, 0], // Vertical
            [1, 1], [-1, -1], // Diagonale principale
            [1, -1], [-1, 1]  // Diagonale secondaire
        ];

        let count = 0;

        const isValid = (x, y) => x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                for (const [dx, dy] of directions) {
                    let k;
                    for (k = 0; k < word.length; k++) {
                        const x = i + k * dx;
                        const y = j + k * dy;
                        if (!isValid(x, y) || grid[x][y] !== word[k]) {
                            break; // Quitte si la condition échoue
                        }
                    }
                    if (k === word.length) { // Toutes les lettres correspondent
                        count++;
                    }
                }
            }
        }

        return count; // Retourner le nombre total d'occurrences
    };

    return findXMAS(grid); // Retourner le résultat de findXMAS
};

const part2 = () => {
    return "Part 2 not implemented yet."; // Message clair pour la partie non implémentée
};

console.log("Part 1:", part1());
console.log("Part 2:", part2());