const express = require("express");
const isAuth = require("../middleware/isAuth");
const { comRules } = require("../middleware/validator");
const { getAll_commantaire, addCommantaire, delete_com, update_com, getone_com } = require("../controler/comcontroler");
const router = express.Router();



router.post("/addcommantaire", isAuth, comRules, addCommantaire)
router.get("/getallcommantaire", isAuth, comRules, getAll_commantaire)
router.delete("/delete_com/:id", isAuth, comRules, delete_com)
router.put("/update_com/:id", isAuth, comRules, update_com)
router.get("/getone_com/:id", isAuth, comRules, getone_com)






module.exports = {comRouter:router};