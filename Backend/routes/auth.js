const express = require("express");
const authController = require("../controllers/authController");
const { validateReg } = require("../validators/authValidators");
const { validateLogin } = require("../validators/authValidators");

const router = express.Router();

router.post("/register", validateReg, authController.register);

router.post("/login", validateLogin, authController.login);

module.exports = router;
