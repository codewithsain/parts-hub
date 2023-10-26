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
const projectController = require('../controllers/projectController')
const whereUsedController = require('../controllers/whereUsedController')
const comparePartsController = require('../controllers/comparePartsController')
const taskDrawerController = require('../controllers/taskDrawerController')
const reportsController = require('../controllers/reportsController')
const chartController = require('../controllers/chartController')

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
router.post('/getPlants', authController.isLoggedIn,authController.isAdmin, partController.getPlants);
router.post('/getUsersDropdown', authController.isLoggedIn,authController.isAdmin, partController.getUsersDropdown);
router.post('/getRevisions', authController.isLoggedIn, authController.isAdmin, partController.getRevision);
router.post('/getParts', authController.isLoggedIn, authController.isAdmin ,partController.getParts);
router.post('/getContainers', authController.isAdmin, authController.isLoggedIn, partController.getContainers);
router.post('/getNumberOfParts', authController.isLoggedIn, partController.countParts);
router.post('/getPartsTable', authController.isLoggedIn, partController.getPartsTable);
router.post('/getUserID', authController.isLoggedIn, partController.getUserID);
router.post('/getPartsForUpdate', authController.isLoggedIn, authController.isAdmin ,partController.getPartsForUpdate);
router.post('/getSpecificPart', authController.isLoggedIn, partController.getSpecificPart);
router.post('/getUsers',authController.isLoggedIn, userController.getUsers);
router.post("/getFlags", authController.isLoggedIn, featureController.getFlags);
router.post("/getQuantities", authController.isLoggedIn, quantityController.getQuantity);
router.post("/getCurrency", authController.isLoggedIn , currencyController.getCurrency);
router.post("/getCosts", authController.isLoggedIn, costController.getCosts)
router.post("/getLeadTimes", authController.isLoggedIn,leadTimeController.getLeadTimes)
router.post("/getTooling", authController.isLoggedIn, toolingController.getTooling)
router.post("/getNotes", authController.isLoggedIn, notesController.getNotes)
router.post("/getSuppliers", authController.isLoggedIn, supplierController.getSuppliers)
router.post("/getInfo", authController.isLoggedIn ,supplierController.getInfo)
router.post("/getCurrentsupplier", authController.isLoggedIn, supplierController.getCurrentSupplier)
router.post("/getPartOverview",authController.isLoggedIn, partController.getPartOverview)
router.post("/getService", authController.isLoggedIn, serviceController.getService)
router.post("/getProject", authController.isLoggedIn, projectController.getProject)
router.post("/getWhereUsed", authController.isLoggedIn, whereUsedController.getWhereUsed)
router.post("/getComparePart", authController.isLoggedIn ,comparePartsController.getComparePart)
router.post("/getComparePartPrice", authController.isLoggedIn, comparePartsController.getComparePartPrice)
router.post("/getComparePartQuantities", authController.isLoggedIn, comparePartsController.getCompareQuantities)
router.post("/getECM", authController.isLoggedIn, comparePartsController.getECM)
router.post("/getSimilarPart", authController.isLoggedIn, comparePartsController.similarPart)
router.post("/getSimlarPartPrice", authController.isLoggedIn, comparePartsController.getSimilarPartPrice)
router.post("/getSimilarPartQuantities", authController.isLoggedIn, comparePartsController.getSimilarQuantities)
router.post("/getPartsCompleted",authController.isLoggedIn, authController.isAdmin,reportsController.getPartsCompleted)
router.post("/getReport", authController.isLoggedIn,  authController.isAdmin, reportsController.getReport)
router.post("/getInfoForChart", authController.isLoggedIn, authController.isAdmin ,chartController.getDataForChart)


//INSERT DATA ROUTER
router.post('/addPart' , authController.isLoggedIn, authController.isAdmin,  partController.addPart);
router.post('/addUser', authController.isLoggedIn, authController.isAdmin,  userController.addUser);
router.post('/addFlag', authController.isLoggedIn, authController.isAdmin,  featureController.addFlag);
router.post('/addQuantity', authController.isLoggedIn, quantityController.addQuantity);
router.post('/addCost',  authController.isLoggedIn, costController.addCost);
router.post('/addLeadTime',  authController.isLoggedIn, leadTimeController.addLeadTime)
router.post('/addTooling', authController.isLoggedIn, toolingController.addTooling)
router.post("/addNotes", authController.isLoggedIn, notesController.addNotes)
router.post("/registerUser", userController.registerUSer)
router.post("/saveSupplier", authController.isLoggedIn, supplierController.saveSupplier)
router.post("/saveService",  authController.isLoggedIn, serviceController.saveService)

//DELETE DATA 
router.post('/deletePart', authController.isLoggedIn, authController.isAdmin ,partController.deletePart);
router.post('/deleteUser', authController.isLoggedIn,authController.isAdmin ,userController.deleteUser);
router.post('/deleteFlag', authController.isLoggedIn,authController.isAdmin ,featureController.deleteFlag);
router.post('/deleteQuan', authController.isLoggedIn, quantityController.deleteQuan);
router.post('/deleteCost',  authController.isLoggedIn, costController.deleteCost);
router.post('/deleteLeadTime', authController.isLoggedIn ,leadTimeController.deleteLeadTime);
router.post('/deleteTooling',  authController.isLoggedIn ,toolingController.deleteTooling);
router.post("/deleteNotes", authController.isLoggedIn, notesController.deleteNotes)

//UPDATE DATA
router.post('/updatePart', authController.isLoggedIn,authController.isAdmin ,partController.updatePart);
router.put('/updateUser/:id', authController.isLoggedIn ,authController.isAdmin ,userController.updateUser);
router.put('/updateFlag/:id', authController.isLoggedIn,authController.isAdmin, featureController.updateFlag);
router.post('/updatePartStatus', authController.isLoggedIn ,taskDrawerController.signOffPart);




module.exports = router;