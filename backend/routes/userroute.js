const express = require("express");
const isAuth = require("../middleware/isAuth");
const { deleteuser, updateuser, getAlluser, getoneuser, updateprofileimg } = require("../controler/usercontroler");
const upload = require("../middleware/uploads");
const router = express.Router();




router.delete("/deleteuser/:id", isAuth, deleteuser);
router.put("/updateuser/:id", isAuth, updateuser);
router.get("/getalluseres", isAuth, getAlluser);
router.get("/getoneuser/:id", isAuth, getoneuser);
router.patch("/profileimg", isAuth, upload.single("myimg"),updateprofileimg);







module.exports = {userRouter:router};