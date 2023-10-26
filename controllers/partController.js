
const store = require("store2");
const dbConn = require("../dbConnection");


exports.getPlants = (req, res, next) =>{

    try {
        dbConn.query("SELECT id, plant FROM plant",
        (error, plants) => {
            if(error){
                res.send("error");
            }
            res.send(plants);
        });
    } catch (error) {
        res.send(error);
    }
}

exports.getRevision = (req, res) =>{

    try {
        dbConn.query("SELECT id, value FROM revision",
        (error, revisions) => {
            if(error){
                res.send("error");
            }
            res.send(revisions);
        });
    } catch (error) {
        res.send(error);
    }

 
}

exports.getUsersDropdown = (req, res) =>{

    try {
        dbConn.query("SELECT id, user FROM user",
        (error, users) => {
            if(error){
                res.send("error");
            }
            res.send(users);
        });
    } catch (error) {
        res.send(error);
    }
}

exports.getParts = (req, res) =>{

    try {
        dbConn.query("SELECT id, partNumber FROM part",
        (error, parts) => {
            if(error){
                res.send("error");
            }
            res.send(parts);
        });
    } catch (error) {
        res.send(error);
    }
}

exports.getContainers = (req, res) =>{

    try {
        dbConn.query("SELECT id, containerDesc FROM container",
        (error, containers) => {
            if(error){
                res.send("error");
            }
            res.send(containers);
        });
    } catch (error) {
        res.send(error);
    }


}

exports.addPart = (req, res) =>{

    const {partNumber, description, similarPart, container, netWeight, grossWeight, termCode, termCodeDesc, user, revision, plant} = req.body;
    console.log(req.body)
    try {
        dbConn.query("SELECT * FROM part WHERE partNumber = ?", [partNumber], (error, part) =>{
            if(part.length >= 1){
               return  res.send("partExist");
            }else{
                try {
                    dbConn.query("INSERT INTO part SET ?",
                                {
                                  partNumber: partNumber.toUpperCase(),
                                  description: description.toUpperCase(),
                                  similarPart: similarPart,
                                  containerID: container,
                                  netWeight: parseFloat(netWeight),
                                  grossWeight: parseFloat(grossWeight),
                                  termCode: parseInt(termCode),
                                  termCodeDesc: termCodeDesc.toUpperCase(),
                                  userID: parseInt(user),
                                  revisionID: parseInt(revision),
                                  plantID: parseInt(plant)
                                }, (error, results) =>{
                                    if(results){
                                        console.log(results)
                                        return res.send("ok");
                                    }else if(error){
                                        console.log(error)
                                        return res.send(error);
                                    }
                                })
                } catch (error) {
                    res.send(error);
       
                }
            }
        })
    } catch (error) {
        res.send(error)
        console.log(error);
    }
}

exports.countParts = (req, res) =>{
    try {
        dbConn.query("SELECT COUNT(id) AS numberOfParts FROM part", (error, results) =>{
            
            if(results){
                return res.send({status: 'ok', numberOfParts: results})
            }else{
                return res.send(error);
            }
           
        })
    } catch (error) {
        
    }
}

exports.getUserID = (req, res) =>{
    res.send(req.cookies.userID);
}

exports.getPartsTable = (req, res) =>{

    const {userID} = req.body;
    console.log(req.body)

    try {
        dbConn.query("SELECT part.id, part.partNumber, part.description, part.termCode, part.netWeight, part.grossWeight FROM user INNER JOIN part ON user.id = part.userId where user = ?", [userID], 
        (error, results) =>{
            if(results){
                return res.send(results);
            }else{
                return res.send(error);

            }
        })
    } catch (error) {
        res.send(error);
    }
}

exports.deletePart = (req, res) =>{
    const {id} = req.body;
    
    try {
        dbConn.query("DELETE FROM part WHERE id=?", [id], (error, results) =>{
            if(results){
                return res.send('ok')
            }else{
                res.send(error);
            }
        })
    } catch (error) {
        res.send(error)
    }
}


exports.getPartsForUpdate = (req, res) =>{
    const {id} = req.body;
    try {
        dbConn.query("SELECT id, partNumber, description, termCode, termCodeDesc, netWeight, grossWeight, similarPart, containerID, plantID, userID, revisionID FROM part WHERE id = ?", [id], 
        (error, results) =>{
            if(results){
                return res.send(results)
            }else{
                return res.send(error);
            }
        })
    } catch (error) {
        res.send(error);
    }
    
}

exports.updatePart = (req, res) =>{
    const {id, partNumber, description, similarPart, container, netWeight, grossWeight, termCode, termCodeDesc, user, revision, plant} = req.body;

    try {
        dbConn.query("UPDATE part  SET ? WHERE id = ?", [ 
            {
            partNumber: partNumber.toUpperCase(),
            description: description.toUpperCase(),
            similarPart: similarPart,
            containerID: container,
            netWeight: parseFloat(netWeight),
            grossWeight: parseFloat(grossWeight),
            termCode: parseInt(termCode),
            termCodeDesc: termCodeDesc.toUpperCase(),
            userID: parseInt(user),
            revisionID: parseInt(revision),
            plantID: parseInt(plant)},
             id], 
             (error, results) =>{
                if(results){
                return res.send('ok');
                }else{
                    return res.send(error);
                }
             })
    } catch (error) {
        res.send(error);
    }
}

exports.getSpecificPart = (req, res) =>{
    const {partNumber} = req.body;

    try {
        dbConn.query("SELECT id, partNumber, description, termCode, netWeight, grossWeight FROM part WHERE partNumber = ?", [partNumber], 
        (error, results) =>{
            if(results){
                console.log(results)
                return res.send(results);
            }else{
                return res.send(error);

            }
        })
    } catch (error) {
        res.send(error);
    }
}

exports.getPartOverview = (req, res) =>{
    const {partNumber} = req.body;

    try {
        dbConn.query("select part.partNumber, revision.value, part.description, plant.plant, part.termCode, part.termCodeDesc, part.netWeight, part.grossWeight, part.globalEAU from ((part inner join revision on part.revisionID = revision.id) inner join plant on part.plantID  = plant.id) where partNumber = ?", [partNumber], 
        (error, results) =>{
            if(results){
                console.log(results)
                return res.send(results);
            }else{
                return res.send(error);

            }
        })
    } catch (error) {
        res.send(error);
    }
}
