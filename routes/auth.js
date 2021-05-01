const router = require("express").Router();
const authController = require("../controllers/auth");

router.post("/create", authController.create);

router.post("/login",authController.login)

module.exports = router;
