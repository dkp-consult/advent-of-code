const fs = require('fs');
const path = require('path');

const createDayFolder = (year, day) => {
    const dir = path.join(__dirname, year, `day${String(day).padStart(2, '0')}`);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'input.txt'), '');
        fs.writeFileSync(path.join(dir, 'instruction.md'), '# Part one\n\n# Part two\n\n');
        fs.copyFileSync(path.join(__dirname, 'utils/template.js'), path.join(dir, 'solution.js'));
        console.log(`Created folder for ${year} - Day ${day}`);
    } else {
        console.log(`Folder for ${year} - Day ${day} already exists.`);
    }
};

// Replace with desired year and day
const year = process.argv[2] || '2024';
const day = process.argv[3] || 1;

createDayFolder(year, day);