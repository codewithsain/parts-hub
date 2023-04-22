const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
const userController = require('../controllers/userController')

router.get("/", authController.isLoggedIn, authController.createCaptcha, (req, res) => {
    if (req.user) {
        res.redirect('/landingPage')
    } else {
        res.render("index")
    }

});


router.get("/register", (req, res) => {
    res.render("register")
});



router.get("/landingPage", authController.isLoggedIn, (req, res) => {
    if (req.user) {

        if (req.user.role === 'admin') {
            res.render("landingPage", {
                name: req.user.name,
                lastName: req.user.lastName,
                position: req.user.position,
                role: req.user.role,
                userID: req.user.user
            })
        } else if (req.user.role === 'user') {
            res.render("landingPage", {
                name: req.user.name,
                lastName: req.user.lastName,
                position: req.user.position,
                userID: req.user.user
            })
        }

    } else {
        res.redirect('/register');
    }

})

router.get("/admin", authController.isLoggedIn, userController.list, (req, res) => {
    if(req.user){
        if(req.user.role === 'admin'){
            res.render('admin',{
                name: req.user.name,
                lastName: req.user.lastName,
                position: req.user.position,
                role: req.user.role,
                userID: req.user.user
            })
        }else{
            res.redirect("/landingPage")
        }
        
    }else{
        res.redirect("/register")
    }
})

router.get("/admin/addUser",authController.isLoggedIn, userController.addUser, (req, res) =>{
    if(req.user){
        if(req.user.role === 'admin'){
            res.render('admin',{
                name: req.user.name,
                lastName: req.user.lastName,
                position: req.user.position,
                role: req.user.role,
                userID: req.user.user
            })
        }else{
            res.redirect("/landingPage")
        }
        
    }else{
        res.redirect("/register")
    }
})

router.get("/admin/addFeature",authController.isLoggedIn, userController.addFeature, (req, res) =>{
    if(req.user){
        if(req.user.role === 'admin'){
            res.render('admin',{
                name: req.user.name,
                lastName: req.user.lastName,
                position: req.user.position,
                role: req.user.role,
                userID: req.user.user
            })
        }else{
            res.redirect("/landingPage")
        }
        
    }else{
        res.redirect("/register")
    }
})




module.exports = router;