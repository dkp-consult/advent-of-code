const fs = require('fs');

let input = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');

function simulateGuardPath(map) {
    const directions = {
        '^': [-1, 0], // Up
        '>': [0, 1],  // Right
        'v': [1, 0],  // Down
        '<': [0, -1]  // Left
    };

    const turnRight = {
        '^': '>',
        '>': 'v',
        'v': '<',
        '<': '^'
    };

    let guardPos, guardDir;
    const visited = new Set();

    // Convert the map into a 2D array
    map = map.map(line => line.split(''));

    // Find the guard's starting position and direction
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[0].length; c++) {
            if ('^>v<'.includes(map[r][c])) {
                guardPos = [r, c];
                guardDir = map[r][c];
                visited.add(`${r},${c}`);
                map[r][c] = '.'; // Clear guard's initial position
                break;
            }
        }
    }

    // Simulate guard movement
    while (true) {
        const [dr, dc] = directions[guardDir];
        const [nr, nc] = [guardPos[0] + dr, guardPos[1] + dc];

        // Check if the guard exits the map
        if (nr < 0 || nr >= map.length || nc < 0 || nc >= map[0].length) {
            break;
        }

        // Turn right if there's an obstacle
        if (map[nr][nc] === '#') {
            guardDir = turnRight[guardDir];
        } else {
            // Otherwise, move forward
            guardPos = [nr, nc];
            visited.add(`${nr},${nc}`);
        }
    }

    return visited.size; // Return the number of distinct positions visited
}

function findLoopPositions(map) {
    const directions = {
        '^': [-1, 0], // Up
        '>': [0, 1],  // Right
        'v': [1, 0],  // Down
        '<': [0, -1]  // Left
    };

    const turnRight = {
        '^': '>',
        '>': 'v',
        'v': '<',
        '<': '^'
    };

    let guardPos, guardDir;

    // Convert the map into a 2D array
    map = map.map(line => line.split(''));

    // Find the guard's starting position and direction
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[0].length; c++) {
            if ('^>v<'.includes(map[r][c])) {
                guardPos = [r, c];
                guardDir = map[r][c];
                map[r][c] = '.'; // Clear guard's initial position
                break;
            }
        }
    }

    // Simulate guard movement with an added obstacle
    function simulateWithObstacle(obstaclePos) {
        const visited = new Set();
        let [row, col] = guardPos;
        let dir = guardDir;

        map[obstaclePos[0]][obstaclePos[1]] = '#'; // Add temporary obstacle

        while (true) {
            const state = `${row},${col},${dir}`;
            if (visited.has(state)) {
                map[obstaclePos[0]][obstaclePos[1]] = '.'; // Restore map
                return true; // Loop detected
            }
            visited.add(state);

            const [dr, dc] = directions[dir];
            const [nr, nc] = [row + dr, col + dc];

            // If the guard exits the map, restore and return
            if (nr < 0 || nr >= map.length || nc < 0 || nc >= map[0].length) {
                map[obstaclePos[0]][obstaclePos[1]] = '.'; // Restore map
                return false;
            }

            // Turn right if there's an obstacle
            if (map[nr][nc] === '#') {
                dir = turnRight[dir];
            } else {
                // Otherwise, move forward
                row = nr;
                col = nc;
            }
        }
    }

    // Find all candidate positions for adding an obstacle
    const candidates = [];
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[0].length; c++) {
            if (map[r][c] === '.' && !(r === guardPos[0] && c === guardPos[1])) {
                candidates.push([r, c]);
            }
        }
    }

    // Count the number of positions that create a loop
    let loopCount = 0;
    for (const pos of candidates) {
        if (simulateWithObstacle(pos)) {
            loopCount++;
        }
    }

    return loopCount;
}

// Execute and output results
console.log("Part 1:", simulateGuardPath(input)); // Number of positions visited
console.log("Part 2:", findLoopPositions(input)); // Number of positions where a loop is formed