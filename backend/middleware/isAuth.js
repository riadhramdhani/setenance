const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res
        .status(401)
        .json({ errors: [{ msg: "you are not authorized" }] });
    }
    const decoded = jwt.verify(token, process.env.secretKey);
    if (!decoded) {
      return res
        .status(401)
        .json({ errors: [{ msg: "you are not authorized" }] });
    }

    req.user = { id: decoded.id };
  } catch (error) {
    return res
      .status(401)
      .json({ errors: [{ msg: "you are not authorized" }] });
  }
  next();
};

module.exports = isAuth;