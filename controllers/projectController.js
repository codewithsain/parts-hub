const dbConn = require("../dbConnection");

exports.getProject = (req, res, next) =>{

    try {
        dbConn.query("SELECT ecm, localECM, ecmChangeType, teamName, ecrNumber FROM project",
        (error, results) => {
            if(error){
                res.send(error);
            }
            res.send(results);
        });
    } catch (error) {
        res.send(error);
    }
}