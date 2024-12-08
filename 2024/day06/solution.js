const fs = require('fs');

let input = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');

function simulateGuardPath(map) {
    const directions = {
        '^': [-1, 0], // Up
        '>': [0, 1], // Right
        'v': [1, 0], // Down
        '<': [0, -1] // Left
    };

    const turnRight = {
        '^': '>',
        '>': 'v',
        'v': '<',
        '<': '^'
    };

    let guardPos, guardDir;
    const visited = new Set();

    input = map.map(line => line.split(''));

    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[0].length; c++) {
            if ('^>v<'.includes(map[r][c])) {
                guardPos = [r, c];
                guardDir = map[r][c];
                visited.add(`${r},${c}`);
                map[r][c] = '.';
                break;
            }
        }
}

while (true) {
    const [dr, dc] = directions[guardDir];
    const [nr, nc] = [guardPos[0] + dr, guardPos[1] + dc];

    if (nr < 0 || nr >= map.length || nc < 0 || nc >= map[0].length) {
        break;
    }

    if (map[nr][nc] === '#') {
        guardDir = turnRight[guardDir];
    } else {
        guardPos = [nr, nc];
        visited.add(`${nr},${nc}`);
    }
}

return visited.size;
}


const part1 = () => {
    
    return null;
};

const part2 = () => {
    // Logic for part 2
    return null;
};

/* const map = [
    "....#.....",
    ".........#",
    "..........",
    "..#.......",
    ".......#..",
    "..........",
    ".#..^.....",
    "........#.",
    "#.........",
    "......#..."
]; */

console.log(simulateGuardPath(input));

console.log("Part 1:", part1());
console.log("Part 2:", part2());