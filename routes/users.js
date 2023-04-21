const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/auth')

router.get("/addUser", authController.isAdmin, userController.addUser);
router.get("/", authController.isAdmin, userController.list);
router.get("/addFeature", authController.isAdmin, userController.addFeature);

module.exports = router;