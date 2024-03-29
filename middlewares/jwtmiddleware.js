const jwt = require("jsonwebtoken");

exports.jwtMiddleware = (req, res, next) => {
  console.log(req.headers["access_token"]);

  const token = req.headers["access_token"].split(" ")[1];

  try {
    const JWTresponse = jwt.verify(token, "supersecretkey123");
    console.log(JWTresponse);
    req.payload = JWTresponse._id;
    next();
  } catch (error) {
    req.payload = null
    next();

  }
};
