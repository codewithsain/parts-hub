const dbConn = require("../dbConnection");

exports.addTooling = (req, res) =>{
    const {invQual,
    supTool,
    supToolExp,
    invRep,
    deereToolExp,
    returnCont,
    expTool,
    deereTool,
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
                    dbConn.query("INSERT INTO tooling SET ?", {invQual: invQual,
                        supTool: supTool,
                        supToolExp:supToolExp,
                        invRep: invRep,
                        deereToolExp: deereToolExp,
                        returnCont: returnCont,
                        expTool: expTool,
                        deereTool: deereTool,
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
                    return res.send(error);
                }
            }
        })
    } catch (error) {
        return res.send(error);
    }
}

exports.getTooling = (req, res) =>{

    const {partNumber} = req.body;

    try {
        dbConn.query("SELECT id FROM part WHERE partNumber = ?", [partNumber], (error, results) =>{
            if(error){
                return res.send(error)
            }else if(results){
                let id = results[0].id;
                try {
                    dbConn.query(`SELECT id, invQual, invRep, expTool,
                     supTool, supToolExp, deereTool, deereToolExp, returnCont, convert_tz(createDate,'+00:00','-06:00') 
                    as createDate FROM tooling  WHERE partID = ? ORDER BY createDate DESC`,
                     [id] ,(error, results) =>{
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

exports.deleteTooling = (req, res) =>{
    const {id} = req.body;

    try {
        dbConn.query("DELETE FROM tooling WHERE id = ?", [id], (error, results) =>{
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