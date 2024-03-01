const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, '123456789', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
    if (err) {
        if (err.name === 'TokenExpiredError') {
          console.log('Token has expired');
        } else {
          console.log('Token verification failed');
        }
        res.sendStatus(403);
      } else {
        req.user = user;
        next();
      }
  });
};

module.exports = {
    authenticateToken
};
