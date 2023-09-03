const dbConn = require("../dbConnection");

exports.getCurrency = (req, res) =>{
    try {
        dbConn.query("SELECT id, currName FROM currency", (error, results) =>{
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