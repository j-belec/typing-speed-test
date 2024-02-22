const express = require("express");
const router = express.Router();
const appController = require("../controllers/appController");

router.get("/", appController.home);
router.get("/language/:lang", appController.lang);

module.exports = router;
