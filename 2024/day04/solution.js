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
    const grid = input.trim().split('\n');
    const word1 = "MAS";
    const word2 = "SAM";
    let count = 0;

    const isValid = (x, y) => x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;

    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[i].length - 1; j++) {
            // Vérifier la diagonale principale
            const diag1 = [
                grid[i-1][j-1], // Haut-gauche
                grid[i][j],     // Centre
                grid[i+1][j+1]  // Bas-droite
            ].join('');

            // Vérifier la diagonale secondaire
            const diag2 = [
                grid[i-1][j+1], // Haut-droite
                grid[i][j],     // Centre
                grid[i+1][j-1]  // Bas-gauche
            ].join('');

            // Vérifier si les diagonales forment un X-MAS
            if ((diag1 === word1 || diag1 === word2) && (diag2 === word1 || diag2 === word2)) {
                count++;
            }
        }
    }

    return count; // Retourner le nombre total d'occurrences
};

console.log("Part 1:", part1());
console.log("Part 2:", part2());