const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');

const part1 = () => {
    const data = input;
    const isSafeReport = (levels) => {
        let increasing = true;
        let decreasing = true;
    
        for (let i = 0; i < levels.length - 1; i++) {
            const diff = levels[i + 1] - levels[i];
    
            // Vérifier que la différence est entre 1 et 3
            if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;
    
            // Met à jour les drapeaux
            if (diff > 0) decreasing = false;
            if (diff < 0) increasing = false;
        }
    
        // Un rapport est sûr s'il est tout en augmentation ou tout en diminution
        return increasing || decreasing;
    };
    
    // Analyse des rapports
    const countSafeReports = () => {
        let safeReportCount = 0;
    
        data.forEach((line) => {
            if (line.trim()) { // Ignorer les lignes vides
                const levels = line.split(' ').map(Number); // Convertir en nombres
                if (isSafeReport(levels)) safeReportCount++;
            }
        });
    
        return safeReportCount;
    };

    return countSafeReports(); // Retourner le résultat de countSafeReports
};

const part2 = () => {
    // Lire les données du fichier
const input = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');

// Fonction pour vérifier si un rapport est sûr
const isSafeReport = (levels) => {
    let increasing = true;
    let decreasing = true;

    for (let i = 0; i < levels.length - 1; i++) {
        const diff = levels[i + 1] - levels[i];

        // Vérifier que la différence est entre 1 et 3
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;

        // Met à jour les drapeaux
        if (diff > 0) decreasing = false;
        if (diff < 0) increasing = false;
    }

    // Un rapport est sûr s'il est tout en augmentation ou tout en diminution
    return increasing || decreasing;
};

// Fonction pour vérifier si un rapport peut devenir sûr en supprimant un niveau
const isSafeWithDampener = (levels) => {
    // Si le rapport est déjà sûr, pas besoin de suppression
    if (isSafeReport(levels)) return true;

    // Essayer de supprimer chaque niveau, un à un
    for (let i = 0; i < levels.length; i++) {
        const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
        if (isSafeReport(modifiedLevels)) return true;
    }

    // Aucun niveau ne permet de rendre le rapport sûr
    return false;
};

// Analyse des rapports
const countSafeReports = () => {
    let safeReportCount = 0;

    input.forEach((line) => {
        if (line.trim()) { // Ignorer les lignes vides
            const levels = line.split(' ').map(Number); // Convertir en nombres
            if (isSafeWithDampener(levels)) safeReportCount++;
        }
    });

    return safeReportCount;

};
return countSafeReports(); // Retourner le résultat de countSafeReports
}
console.log("Part 1:", part1());
console.log("Part 2:", part2());