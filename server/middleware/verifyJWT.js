const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(403);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, 'afdf543asg34r2f498af', (err, decoded) => {
    if (err !== null || req.query.username != decoded.username) {
      return res.sendStatus(403)
    }
    next();
  });
};

module.exports = verifyJWT;
