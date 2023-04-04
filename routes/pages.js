const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.get("/", authController.isLoggedIn, (req, res) => {
    if(req.user){
        res.redirect('/landingPage')
    }else{
        res.render("index")
    }
   
});

router.get("/register", (req, res) => {
    res.render("register")
});


router.get("/landingPage", authController.isLoggedIn, (req, res) =>{
    if(req.user){
        res.render("landingPage")
    }else{
        res.redirect('/register');
    }
    
})

module.exports = router;