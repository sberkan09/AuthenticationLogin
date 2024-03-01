const fs = require('fs');

const read = (path) => {
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
