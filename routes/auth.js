const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post('/register', authController.register);

router.post('/index', authController.index);

module.exports = router;
