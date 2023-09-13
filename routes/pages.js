const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
const userController = require('../controllers/userController')
const featureController = require('../controllers/featureController')
const partController = require('../controllers/partController')
const quantityController = require('../controllers/quantityController')
const currencyController = require('../controllers/currencyController')
const costController = require('../controllers/costController')
const leadTimeController = require('../controllers/leadTimeController')
const toolingController = require('../controllers/toolingController')
const notesController = require('../controllers/notesController')
const supplierController = require('../controllers/supplierController')
const serviceController = require('../controllers/serviceController')

//AUTH ROUTES
router.post("/auth", authController.logIn);
router.get("/logout", authController.logout);
router.post("/renderAdmin", authController.renderAdmin)

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

router.get("/admin", authController.isLoggedIn, authController.isAdmin, (req, res) =>{
  res.render("admin");
})

router.get("/partDetails/:id", authController.isLoggedIn, (req, res) =>{
  let part = req.params;
  res.cookie("currentPart", (part.id));
  res.render("partDetails")
})

router.get("/register", (req, res) => {
    res.render("register")
});


//CONSULTING ROUTERS
router.post('/getPlants', authController.isAdmin, partController.getPlants);
router.post('/getUsersDropdown',authController.isAdmin, partController.getUsersDropdown);
router.post('/getRevisions', authController.isAdmin, partController.getRevision);
router.post('/getParts', partController.getParts);
router.post('/getContainers', authController.isAdmin, authController.isLoggedIn, partController.getContainers);
router.post('/getNumberOfParts', partController.countParts);
router.post('/getPartsTable', partController.getPartsTable);
router.post('/getUserID', partController.getUserID);
router.post('/getPartsForUpdate', authController.isAdmin ,partController.getPartsForUpdate);
router.post('/getSpecificPart', partController.getSpecificPart);
router.post('/getUsers', userController.getUsers);
router.post("/getFlags", featureController.getFlags);
router.post("/getQuantities", quantityController.getQuantity);
router.post("/getCurrency", currencyController.getCurrency);
router.post("/getCosts", costController.getCosts)
router.post("/getLeadTimes", leadTimeController.getLeadTimes)
router.post("/getTooling", toolingController.getTooling)
router.post("/getNotes", notesController.getNotes)
router.post("/getSuppliers", supplierController.getSuppliers)
router.post("/getInfo", supplierController.getInfo)
router.post("/getCurrentsupplier", supplierController.getCurrentSupplier)
router.post("/getPartOverview", partController.getPartOverview)
router.post("/getService", serviceController.getService)

//INSERT DATA ROUTER
router.post('/addPart', authController.isAdmin, partController.addPart);
router.post('/addUser',  userController.addUser);
router.post('/addFlag',  featureController.addFlag);
router.post('/addQuantity',  quantityController.addQuantity);
router.post('/addCost',  costController.addCost);
router.post('/addLeadTime',  leadTimeController.addLeadTime)
router.post('/addTooling',  toolingController.addTooling)
router.post("/addNotes", notesController.addNotes)
router.post("/registerUser", userController.registerUSer)
router.post("/saveSupplier", supplierController.saveSupplier)
router.post("/saveService", serviceController.saveService)

//DELETE DATA 
router.post('/deletePart', authController.isAdmin ,partController.deletePart);
router.post('/deleteUser', authController.isAdmin ,userController.deleteUser);
router.post('/deleteFlag', authController.isAdmin ,featureController.deleteFlag);
router.post('/deleteQuan',  quantityController.deleteQuan);
router.post('/deleteCost',  costController.deleteCost);
router.post('/deleteLeadTime',  leadTimeController.deleteLeadTime);
router.post('/deleteTooling',  toolingController.deleteTooling);
router.post("/deleteNotes", notesController.deleteNotes)

//UPDATE DATA
router.post('/updatePart', authController.isAdmin ,partController.updatePart);
router.put('/updateUser/:id', authController.isAdmin ,userController.updateUser);
router.put('/updateFlag/:id', authController.isAdmin, featureController.updateFlag);




module.exports = router;