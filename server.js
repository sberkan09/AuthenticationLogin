const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const users = [
  { id: 1, username: 'admin', password: 'admin' }
];

app.post('/login', (req, res) => {
  console.log('request');
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ userId: user.id }, 'yourSecretKey', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Username or password is incorrect');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
