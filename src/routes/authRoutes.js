const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate");
const validations = require("../validations");

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
	"/register",
	validate(validations.auth.register),
	authController.register
);
router.post("/login", validate(validations.auth.login), authController.login);

router.get("/me", authMiddleware, authController.me);

module.exports = router;
