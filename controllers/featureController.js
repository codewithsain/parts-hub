
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


