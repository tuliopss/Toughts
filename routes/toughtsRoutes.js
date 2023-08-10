const express = require("express");
const router = express.Router();
const ToughtsController = require("../controllers/ToughtsController");

const checkAuth = require("../helpers/auth").checkAuth;

//COLOCAR O MIDDLEWARE APOS TESTE

router.get("/add", ToughtsController.createTought);
router.get("/dashboard", ToughtsController.dashboard);
router.get("/", ToughtsController.showToughts);

module.exports = router;
