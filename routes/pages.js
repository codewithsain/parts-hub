const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
const userController = require('../controllers/userController')
const featureController = require('../controllers/featureController')
const partController = require('../controllers/partController')

//AUTH ROUTES
router.post("/auth", authController.logIn);
router.get("/logout", authController.logout);

//PAGES ROUTES
router.get("/",  (req, res) =>{
  if(req.cookies.loggedIn === 'true'){
    res.redirect("/landingPage")
  }else{
    res.render("index");
  }
   
 
});

router.get("/landingPage", authController.isLoggedIn ,(req, res) =>{
  res.render("landingPage")
})

router.get("/admin", authController.isLoggedIn, (req, res) =>{
  res.render("admin");
})

//CONSULTING ROUTERS
// router.post('/getPlants', partController.getPlants);
// router.post('/getUsers', partController.getUsers);
// router.post('/getRevisions', partController.getRevision);
// router.post('/getParts', partController.getParts);
// router.post('/getContainers', partController.getContainers);
// router.post('/getNumberOfParts', partController.countParts);
// router.post('/getPartsTable', partController.getPartsTable);
// router.post('/getUserID', partController.getUserID);
// router.post('/getPartsForUpdate', partController.getPartsForUpdate);

// //INSERT DATA ROUTER
// router.post('/addPart', partController.addPart);


// //DELETE DATA 
// router.post('/deletePart', partController.deletePart);
// // router.get("/register", (req, res) => {
// //     res.render("register")
// // });



// router.get("/landingPage", authController.isLoggedIn, async (req, res) => {
//     if (req.user) {
//         const parts = await partController.listParts();
//         const numberOfParts = await partController.countParts();
//         if (req.user.role === 'admin') {
//             res.render("landingPage", {
//                 parts,
//                 numberOfParts,
//                 name: req.user.name,
//                 lastName: req.user.lastName,
//                 position: req.user.position,
//                 role: req.user.role,
//                 userID: req.user.user
//             })
//         } else if (req.user.role === 'user') {
//             res.render("landingPage", {
//                 parts,
//                 numberOfParts,
//                 name: req.user.name,
//                 lastName: req.user.lastName,
//                 position: req.user.position,
//                 userID: req.user.user
//             })
//         }

//     } else {
//         res.redirect('/register');
//     }

// })

// router.get("/admin", authController.isLoggedIn, async (req, res) => {
//     if(req.user){
//         if(req.user.role === 'admin'){
//             const users = await userController.listUsers();
//             const features = await featureController.listFeatures();
//             res.render("admin",{
//                 users,
//                 name: req.user.name,
//                 lastName:req.user.lastName,
//                 position: req.user.position,
//                 features
//             })
//         }else{
//             res.redirect("/landingPage")
//         }
//     }else{
//         res.redirect("/register")
//     }
// })

// router.get("/admin/addUsers", authController.isLoggedIn, (req, res) => {
//     if(req.user){
//         if(req.user.role === 'admin'){
//            res.render("admin",{
//             showModalUser: true,
//             name: req.user.name,
//             lastName:req.user.lastName,
//             position: req.user.position
//            })
//         }else{
//             res.redirect("/landingPage")
//         }
        
//     }else{
//         res.redirect("/register")
//     }
// })

// router.get("/admin/addFeatures",authController.isLoggedIn, (req, res) =>{
//     if(req.user){
//         if(req.user.role === 'admin'){
//             res.render('admin',{
//             showModalFeature: true,
//             name: req.user.name,
//             lastName:req.user.lastName,
//             position: req.user.position
//             })
//         }else{
//             res.redirect("/landingPage")
//         }
        
//     }else{
//         res.redirect("/register")
//     }
// })

// router.post("/admin/addFeatures/save",  authController.isLoggedIn,  async (req, res) =>{
//     if(req.user){
//         if(req.user.role === 'admin'){
//            await featureController.saveFeatures(req, res);
//         }else{
//             res.redirect("/landingPage")
//         }
        
//     }else{
//         res.redirect("/register")
//     }
// });


// router.post("/admin/addUsers/save", authController.isLoggedIn,  async (req, res) => {
//     if(req.user){
//         if(req.user.role === 'admin'){
//             await userController.saveUsers(req, res);
//         }else{
//             res.redirect("/landingPage")
//         }
        
//     }else{
//         res.redirect("/register")
//     }
// });

// router.post("/admin/deleteFeatures",  authController.isLoggedIn,  async (req, res) =>{
//     if(req.user){
//         if(req.user.role === 'admin'){
//            await featureController.deleteFeatures(req, res);
//            res.redirect("/admin")
//         }else{
//             res.redirect("/landingPage")
//         }
        
//     }else{
//         res.redirect("/register")
//     }
// });

// router.post("/admin/updateFeatures",  authController.isLoggedIn,  async (req, res) =>{
//     if(req.user){
//         if(req.user.role === 'admin'){
//            await featureController.updateFeatures(req, res);
//            res.redirect("/admin")
//         }else{
//             res.redirect("/landingPage")
//         }
        
//     }else{
//         res.redirect("/register")
//     }
// });

// router.post("/admin/updateFeatures/save",  authController.isLoggedIn,  async (req, res) =>{
//     if(req.user){
//         if(req.user.role === 'admin'){
//            await featureController.editFeatures(req, res);
//         }else{
//             res.redirect("/landingPage")
//         }
        
//     }else{
//         res.redirect("/register")
//     }
// });
// router.post("/admin/deleteUsers",  authController.isLoggedIn,  async (req, res) =>{
//     if(req.user){
//         if(req.user.role === 'admin'){
//            await userController.deleteUsers(req, res);
//            res.redirect("/admin")
//         }else{
//             res.redirect("/landingPage")
//         }
        
//     }else{
//         res.redirect("/register")
//     }
// });

// router.post("/admin/updateUsers",  authController.isLoggedIn,  async (req, res) =>{
//     if(req.user){
//         if(req.user.role === 'admin'){
//            await userController.updateUsers(req, res);
//         }else{
//             res.redirect("/landingPage")
//         }
        
//     }else{
//         res.redirect("/register")
//     }
// });

// router.post("/admin/updateUsers/save",  authController.isLoggedIn,  async (req, res) =>{
//     if(req.user){
//         if(req.user.role === 'admin'){
//            await userController.editUsers(req, res);
//         }else{
//             res.redirect("/landingPage")
//         }
//     }else{
//         res.redirect("/register")
//     }
// });


// router.post("/landingPage/addParts", authController.isLoggedIn, async (req, res) =>{
//     if(req.user){
//         if(req.user.role === 'admin'){
//             await partController.showModalAddPart(req, res);
//         }else{
//             res.redirect("/landingPage")
//         }
//     }else{
//         res.redirect("/landingPage")
//     }
// })

// router.post("/landingPage/addParts/save", authController.isLoggedIn, async (req, res) =>{
//     if(req.user){
//         if(req.user.role === 'admin'){
//             await partController.saveParts(req, res);
//         }else{
//             res.redirect("/landingPage")
//         }
//     }else{
//         res.redirect("/landingPage")
//     }
// })

// router.post("/landingPage/deleteParts", authController.isLoggedIn, async (req, res) =>{
//     if(req.user){
//         if(req.user.role === 'admin'){
//             await partController.deleteParts(req, res);
//             res.redirect("/landingPage");
//         }else{
//             res.redirect("/landingPage")
//         }
//     }else{
//         res.redirect("/landingPage")
//     }
// })

// router.post("/landingPage/updateParts", authController.isLoggedIn, async (req, res) =>{
//     if(req.user){
//         if(req.user.role === 'admin'){
//             await partController.updateParts(req, res);
//         }else{
//             res.redirect("/landingPage")
//         }
//     }else{
//         res.redirect("/landingPage")
//     }
// })

// router.post("/landingPage/updateParts/save", authController.isLoggedIn, async (req, res) =>{
//     if(req.user){
//         if(req.user.role === 'admin'){
//             await partController.editParts(req, res);
//         }else{
//             res.redirect("/landingPage")
//         }
//     }else{
//         res.redirect("/landingPage")
//     }
// })

// router.post("/landingPage/search", authController.isLoggedIn, async (req, res) => {
//     if(req.user){
//             await partController.search(req, res);
//     }else{
//         res.redirect("/landingPage")
//     }
// })

// router.get("/partDetails", authController.isLoggedIn, async (req, res) => {
//     if(req.user){
//         if(req.user.role === 'admin'){
//             res.render("partDetails",{
//                 name: req.user.name,
//                 lastName: req.user.lastName,
//                 position: req.user.position,
//                 role: req.user.role
//             })
//         }else{
//             res.render("partDetails",{
//             name: req.user.name,
//             lastName: req.user.lastName,
//             position: req.user.position
//             })
//         }
           
//     }else{
//         res.redirect("/landingPage")
//     }
// })


module.exports = router;