const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const cors = require('cors');

const read = require('./reader').read;
const authenticateToken = require('./auth').authenticateToken;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const users = [
  { id: 1, username: 'admin', password: 'admin' }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ userId: user.id }, '123456789', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Username or password is incorrect');
  }
});

app.get('/ping', (req, res) => {
  res.json({
    message: "Ping successful"
  });
});

app.get('/', (req, res) => {
  res.type('html');
  res.send(read('./Login.html'));
});

app.get('/profile', (req, res) => {
  res.type('html');
  res.send(read('./Profile.html'));
});

app.get('/auth', authenticateToken, (req, res) => {
  res.send({
    success: true
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
