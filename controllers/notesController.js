const dbConn = require("../dbConnection");

exports.addNotes = (req, res) =>{
    const {notes, createDate, partNumber} = req.body;
    console.log(req.body)
    try {
        dbConn.query("SELECT id FROM part WHERE partNumber = ?", [partNumber], (error, results) =>{
            if(error){
                return res.send(error)
            }else if(results){
                let id = results[0].id;
                try {
                    dbConn.query("INSERT INTO notes SET ?", {
                        note: notes,
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

exports.getNotes = (req, res) =>{

    const {partNumber} = req.body;

    try {
        dbConn.query("SELECT id FROM part WHERE partNumber = ?", [partNumber], (error, results) =>{
            if(error){
                return res.send(error)
            }else if(results){
                let id = results[0].id;
                try {
                    dbConn.query("SELECT id, note, convert_tz(createDate,'+00:00','-06:00') as createDate FROM notes  WHERE partID = ? ORDER BY createDate DESC", [id] ,(error, results) =>{
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

exports.deleteNotes = (req, res) =>{
    const {id} = req.body;

    try {
        dbConn.query("DELETE FROM notes WHERE id = ?", [id], (error, results) =>{
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