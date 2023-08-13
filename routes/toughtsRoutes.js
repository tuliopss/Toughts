const express = require("express");
const router = express.Router();
const ToughtsController = require("../controllers/ToughtsController");

const checkAuth = require("../helpers/auth").checkAuth;

//COLOCAR O MIDDLEWARE APOS TESTE

router.get("/add", checkAuth, ToughtsController.createTought);
router.post("/add", checkAuth, ToughtsController.createToughtSave);
router.get("/edit/:id", checkAuth, ToughtsController.editTought);
router.post("/edit", checkAuth, ToughtsController.editToughtSave);
router.get("/dashboard", checkAuth, ToughtsController.dashboard);
router.post("/remove", checkAuth, ToughtsController.removeTought);
router.get("/", ToughtsController.showToughts);

module.exports = router;
