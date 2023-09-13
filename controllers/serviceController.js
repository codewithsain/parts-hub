const dbConn = require("../dbConnection");

exports.getService = (req, res) =>{
    const {partNumber} = req.body;

    try {
        dbConn.query("SELECT id FROM part WHERE partNumber = ?", [partNumber], (error, results) =>{
            if(error){
                return res.send(error)
            }else if(results){
                let id = results[0].id;
                try {
                    dbConn.query("SELECT lsi, gsi, convert_tz(createDate,'+00:00','-06:00') as createDate FROM service  WHERE partID = ? ORDER BY createDate DESC", [id] ,(error, results) =>{
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


exports.saveService = (req, res) =>{
    const {lsi, gsi,
    createDate,
    partNumber} = req.body;
  
    console.log(req.body)

    try {
        dbConn.query("SELECT id FROM part WHERE partNumber = ?", [partNumber], (error, results) =>{
            if(error){
                console.log(results)
                return res.send(error)
            }else if(results){
                let id = results[0].id;
                try {
                    dbConn.query("INSERT INTO service SET ?", {lsi: lsi,
                        gsi: gsi,
                        createDate: createDate,
                        partID: id},
                    (error, results) =>{
                        if(error){
                           console.log(results)
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