const fs = require('fs');
const path = './Login.html';

const read = () => {
    try {
        const data = fs.readFileSync(path);
        return data;
    } catch (err) {
        console.error('Error reading the file:', err);
    }
};

module.exports = {
    read
};
