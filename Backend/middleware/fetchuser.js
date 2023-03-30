const jwt = require("jsonwebtoken");
const JWT_SECRET = "arghaisabadb$oy";

//get user from jwt token and add id to req object
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "please authenticate with a valid token" });
  }

  try {
      const data = jwt.verify(token, JWT_SECRET);
      console.log(data);
      req.user = data.user;
      next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate with a valid token" });
  }
};

module.exports = fetchuser;
