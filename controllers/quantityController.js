
const dbConn = require("../dbConnection");

exports.addQuantity = (req, res) =>{

    const {globalEstimation, buyerEstimation, quotedEstimation, createDate, partNumber} = req.body;
    console.log(req.body)
    try {
        dbConn.query("SELECT id FROM part WHERE partNumber = ?", [partNumber], (error, results) =>{
            if(error){
                return res.send(error)
            }else if(results){
                let id = results[0].id;
                try {
                    dbConn.query("INSERT INTO quantity SET ?", {globalEstimation: globalEstimation, buyerEstimation: buyerEstimation, quotedEstimation: quotedEstimation, createDate: createDate, partID: id},
                    (error, results) =>{
                        if(error){
                            return res.send(error)
                        }else if(results){
                            return res.send("ok");
                        }
                    })
                } catch (error) {
                    return res.send();
                }
            }
        })
    } catch (error) {
        return res.send(error);
    }
}


exports.getQuantity = (req, res) =>{

    const {partNumber} = req.body;

    try {
        dbConn.query("SELECT id FROM part WHERE partNumber = ?", [partNumber], (error, results) =>{
            if(error){
                return res.send(error)
            }else if(results){
                let id = results[0].id;
                try {
                    dbConn.query("SELECT id, globalEstimation, buyerEstimation, quotedEstimation, convert_tz(createDate,'+00:00','-06:00') as createDate FROM quantity  WHERE partID = ? ORDER BY createDate DESC", [id] ,(error, results) =>{
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
        })
    } catch (error) {
        return res.send(error)
    }
  
}


exports.deleteQuan = (req, res) =>{
    const {id} = req.body;

    try {
        dbConn.query("DELETE FROM quantity WHERE id = ?", [id], (error, results) =>{
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