const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

const validate = require("../middlewares/validate");
const validations = require("../validations");

const auth = require("../middlewares/authMiddleware"); // middleware to set req.user

router.use("/", auth);
router.get("/", menuController.index);
router.post("/", validate(validations.menu.create), menuController.store);
router.put("/:id", validate(validations.menu.create), menuController.update);
router.delete("/:id", menuController.destroy);

module.exports = router;
