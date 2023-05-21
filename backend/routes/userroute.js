const express = require("express");
const isAuth = require("../middleware/isAuth");
const { deleteuser, updateuser, getAlluser, getoneuser } = require("../controler/usercontroler");
const router = express.Router();




router.delete("/deleteuser/:id", isAuth, deleteuser);
router.put("/updateuser/:id", isAuth, updateuser);
router.get("/getalluseres", isAuth, getAlluser);
router.get("/getoneuser/:id", isAuth, getoneuser);







module.exports = {userRouter:router};