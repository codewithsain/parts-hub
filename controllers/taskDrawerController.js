const dbConn = require("../dbConnection");


exports.signOffPart = (req, res) =>{
    const {partNumber, updateDate} = req.body;

    try {
        dbConn.query("UPDATE part SET ? WHERE partNumber = ?", [{status: 'completed', updateDate: updateDate}, partNumber], (error, results) =>{
            if(error){
                return res.send(error)
            }else if(results){
                return res.send("ok")
            }
        })
    } catch (error) {
        return res.send(error)
    }
}