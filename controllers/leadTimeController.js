const dbConn = require("../dbConnection")

exports.addLeadTime = (req, res) =>{
    const {prodProcBB,
    toolNBB,
    location,
    expLT,
    ppLT,
    toolLT,
    adminLT,
    mRLT,
    createDate,
    partID} = req.body;
    console.log(req.body)

    try {
        dbConn.query("SELECT id FROM part WHERE partNumber = ?", [partID], (error, results) =>{
            if(error){
                return res.send(error)
            }else if(results){
                let id = results[0].id;
                try {
                    dbConn.query("INSERT INTO leadtime SET ?", {prodProcBB:prodProcBB ,
                        toolNBB: toolNBB,
                        location: location,
                        expLT: expLT,
                        ppLT: ppLT,
                        toolLT: toolLT,
                        adminLT: adminLT,
                        mRLT: mRLT,
                        createDate: createDate,
                        partID: id},
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

exports.getLeadTimes = (req, res) =>{

    const {partNumber} = req.body;

    try {
        dbConn.query("SELECT id FROM part WHERE partNumber = ?", [partNumber], (error, results) =>{
            if(error){
                return res.send(error)
            }else if(results){
                let id = results[0].id;
                try {
                    dbConn.query("SELECT id, prodProcBB, toolNBB, location, expLT, ppLT, adminLT, toolLT, mRLT, convert_tz(createDate,'+00:00','-06:00') as createDate FROM leadtime  WHERE partID = ? ORDER BY createDate DESC", [id] ,(error, results) =>{
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

exports.deleteLeadTime = (req, res) =>{
    const {id} = req.body;

    console.log(id)

    try {
        dbConn.query("DELETE FROM leadtime WHERE id = ?", [id], (error, results) =>{
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