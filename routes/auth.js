const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post('/register', authController.register);

router.post('/index', authController.index);

router.get('/logout', authController.logout);




module.exports = router;
