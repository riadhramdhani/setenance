const { body, validationResult } = require("express-validator");

const registerRules = [
  body("username", " username is required").notEmpty(),
  body("email", "email is required").isEmail(),
  body("password", " password must have 6 character").isLength({ min: 6 }),
  body("profession", " profession is required").notEmpty(),

];

const loginRules = [
  body("email", "email is required").isEmail(),
  body("password", " password is required").notEmpty(),
];
const serviceRules = [
  body("title", "title is required").notEmpty(),
  body("img_url", "img_url is required").notEmpty(),
  body("phone_number", " phone_number is required").notEmpty(),
  body("adrese", " adresse is required").notEmpty(),
  body("description", " description is required").notEmpty(),
];
const comRules = [
  body("text", "text is required").notEmpty(),
  body("serviceId", "serviceId is required").notEmpty(),
  
];
const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { registerRules, validator, loginRules , comRules,serviceRules};