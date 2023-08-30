
const dbConn = require("../dbConnection");

exports.getFlags = (req, res) =>{

    try {
        dbConn.query("SELECT id, name, cookie, value FROM featureflags", (error, results) =>{
            if(error){
                return res.send(error)
            }else if(results){
                return res.send(results);
            }
        })
    } catch (error) {
        return res.send(error);
    }
}


exports.addFlag = (req, res) =>{

    const {name, cookie, value} = req.body;

    try {
        dbConn.query("INSERT INTO featureFlags SET ?", {name: name, cookie: cookie, value: value}, (error, results) =>{
            if(error){
                return res.send(error)
            }else if(results){
                return res.send("ok");
            }
        })
    } catch (error) {
        return res.send(error);
    }
}

exports.deleteFlag = (req, res) =>{
    const {id} = req.body;

    try {
        dbConn.query("DELETE FROM featureFlags WHERE id = ?", [id], (error, results) =>{
            if(error){
                return res.send(error)
            }else if(results){
                return res.send("ok");
            }
        })
    } catch (error) {
        return res.send(error);
    }

}


exports.updateFlag = (req, res) =>{

    const {id} = req.params;
    const {name, cookie, value} = req.body
    console.log(req.body)


    try {
        dbConn.query("UPDATE featureFlags SET ? WHERE id = ?", [{name: name, cookie: cookie, value: value}, id],
        (error, results) =>{
            if(error){
                console.log(error)
                return res.send(error)
            }else if(results){
                console.log(results)
                return res.send("ok");
            }
        })
    } catch (error) {
        console.log(error)
    return res.send(error);
    } 

}


// featureController.listFeatures = (req, res) => {
//   try {
//     return new Promise((resolve, reject) => {
//       dbConn.query(
//         "SELECT id, name, cookie, value FROM featureFlags",
//         (error, users) => {
//           if (error) {
//             reject(error);
//           }

//           resolve(users);
//         }
//       );
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// featureController.saveFeatures = async (req, res) =>{
//     const {idFF, nameFF, cookieFF, valueFF} = req.body;
//     const characters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

//     store.setAll({
//         nameFF: nameFF,
//         cookieFF: cookieFF,
//         valueFF: valueFF
//       });

//       try {

//         if (
//             characters.test(nameFF) ||
//             characters.test(cookieFF)
//           ) {
//             return res.render("admin", {
//               specialC:
//                 "Name or cookie cannot contain special characters",
//               showModalFeature: true,
//               nameFF: store.get("nameFF"),
//               cookieFF: store.get("cookieFF")
//             });
//           }
//         return new Promise((resolve, reject) => {
//             dbConn.query("INSERT INTO featureFlags SET ?", {name: nameFF, cookie: cookieFF, value: valueFF},
//             (error, results) => {
//                 if(error){
//                     console.log(error)
//                 }else{
//                     store.clear();
//                     return res.render("admin",{
//                         showModalFeature: true,
//                         featureRegisteredMessage: "Feature registered succesfully"
//                     }) 
//                 }
//             })
//           })
//     } catch (error) {
//         console.log(error)
//       }
// }

// featureController.deleteFeatures = (req, res) => {
//     const featureDelete = req.body.featureDelete;
    
//     try {
//       return new Promise((resolve, reject) => {
//         dbConn.query(
//           "DELETE FROM featureFlags WHERE id = ?",
//           [featureDelete],
//           (error, features) => {
//             if (error) {
//               reject(error);
//             }
  
//             resolve(features);
//           }
//         );
//       });
//     } catch (error) {
//       console.log(error);
//     }
// };


// featureController.updateFeatures = (req, res) =>{
//     const id = req.body.featureUpdate;

//     try{
//         return new Promise((resolve, reject) =>{

//             dbConn.query("SELECT id, name, cookie, value FROM featureFlags WHERE id = ? ", [id],
//             (error, features) =>{
//                 if(error){
//                     console.log(error);
//                 }else{
//                     return res.render("admin",{
//                         showModalUpdateFeature: true,
//                         idFF: features[0].id,
//                         nameFF: features[0].name,
//                         cookieFF: features[0].cookie,
//                         valueFF: features[0].value,
//                     })
//                 }
//             })
            
//         })
//     }catch(error){
//         console.log(error)
//     }
// }



// featureController.editFeatures = async (req, res) =>{

// const id = req.body.id;

// const {
//     name,
//     cookie,
//     value} = req.body;

// const characters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

// store.setAll({
//     nameFF: name,
//     cookieFF: cookie,
//     valueFF: value,
// });

//     try {
//         if (
//             characters.test(name) ||
//             characters.test(cookie) 
//           ) {
//             return res.render("admin", {
//               specialC:
//                 "User, name, last name or position cannot contain special characters",
//               showModalUpdateFeature: true,
//               nameFF: name,
//               cookieFF: cookie,
//               valueFF: value
//             });
//           }
    
//           const data = req.body;
          
//         return new Promise((resolve, reject) =>{
//             dbConn.query("UPDATE featureFlags SET ? WHERE id = ?", [data, id],
//             (error, results) => {
//                 if(error){
//                     console.log(error)
//                 }
//                 console.log(results);
//                 store.clear();
//                 res.redirect("/admin")
//             })
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }
// module.exports = featureController;
