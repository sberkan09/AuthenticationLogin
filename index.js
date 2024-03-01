const app = require('../app');
const vercel = require('@vercel/node');

module.exports = vercel(app);
