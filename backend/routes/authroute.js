const express = require("express");
const { signup, signin, current } = require("../controler/authcontroler");
const {
  registerRules,
  validator,
  loginRules,
} = require("../middleware/validator");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

// router.get("/test", (req, res) => {
//   res.send("this is a test");
// });

// signup create new user
// method post
// access public

router.post("/signup", registerRules, validator, signup);

// signin connecté
// method post
// access public
router.post("/signin", loginRules, validator, signin);

router.get("/current", isAuth, current);

module.exports = {authRouter:router};