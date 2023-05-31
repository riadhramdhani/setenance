const express = require("express");
const { addService, getAllservice, deleteservice, updateservice, getoneservice } = require("../controler/servicecontroler");
const isAuth = require("../middleware/isAuth");
const { serviceRules } = require("../middleware/validator");
const router = express.Router();


router.post("/addservice",isAuth,serviceRules,addService)
router.get("/allservice",getAllservice)
router.delete("/deleteservice/:id",isAuth,serviceRules,deleteservice)
router.put("/updateservice/:id",isAuth,serviceRules,updateservice)
router.get("/get_one_service/:id",isAuth,getoneservice)








module.exports = {serviceRouter:router};




