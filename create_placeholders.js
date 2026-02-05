const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images');
const categoriesDir = path.join(dir, 'categories');

if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
if (!fs.existsSync(categoriesDir)) fs.mkdirSync(categoriesDir, { recursive: true });

// 1x1 pixel grey PNG
const buffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKwMPQAAAABJRU5ErkJggg==', 'base64');

const files = [
    'hero.png',
    'interior.png',
    'categories/facial.png',
    'categories/corporal.png',
    'categories/kinesiologia.png'
];

files.forEach(file => {
    fs.writeFileSync(path.join(dir, file), buffer);
    console.log(`Created ${file}`);
});
