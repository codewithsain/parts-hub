const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post('/register', authController.register);

router.post('/index', authController.index, authController.createCaptcha);

router.get('/logout', authController.logout, authController.createCaptcha);




module.exports = router;
