
const dbConn = require("../dbConnection");
const bcrypt = require("bcryptjs");

exports.addUser =  (req, res) =>{
    const {user, role, name, position, password, lastName, email } = req.body;
    
    try {
        dbConn.query("SELECT * FROM user WHERE user = ?", [user], (error, resultsByUser) =>{
            if(error){
                return res.send(error)
            }else if(resultsByUser.length >= 1){
                return res.send("userExist")
            }else{
                console.log("hola3")
                try {
                    dbConn.query("SELECT * FROM user WHERE email = ?", [email],  async(error, resultsByEmail) =>{
                        if(resultsByEmail.length >= 1){
                        
                           
                            return res.send("emailExist")
                        }else{
                            let hashedPassword =  await bcrypt.hash(password, 8);
                          
                            try {
                                dbConn.query("INSERT INTO user SET ?",{
                                    user: user,
                                    name: name,
                                    lastName: lastName,
                                    position:position,
                                    role: role, 
                                    email: email,
                                    password: hashedPassword
                                }, (error, results) =>{
                                    if(results){
                                        return res.send("ok")
                                    }else{
                                        return res.send(error);
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
        })
    } catch (error) {
        console.log(error)
        return res.send(error);
    }
}

exports.getUsers = (req, res) =>{
    try {
        dbConn.query("SELECT id, user, name, lastName, position, role, email FROM user", (error, results) =>{
            if(results){
                return res.send(results);
            }else{
                return res.send(error)
            }
        })
    } catch (error) {
        return res.rend(error);
    }
}

exports.deleteUser = (req, res) =>{
    const {id} = req.body
    try {
        dbConn.query("DELETE FROM user WHERE id = ?", [id], (error, results) =>{
            if(results){
                return res.send("ok")
            }else{
                return res.send(error)
            }
        })
    } catch (error) {
        return res.send(error)
    }
}

exports.updateUser = (req, res) =>{
    const {id} = req.params;
    console.log(req.params)
    const {user, name, lastName, role, position, email} = req.body
    console.log(req.body);

    try {
        dbConn.query("UPDATE user SET ? WHERE id = ?", [{user: user, name: name, lastName: lastName, role: role, position: position, email: email}, id],
        (error, results) =>{
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

exports.registerUSer = (req, res) =>{
    const {user, name, lastName, position, email, password} = req.body;

    try {
        dbConn.query("SELECT * FROM user WHERE user = ?", [user], (error, resultsByUser) =>{
            if(error){
                return res.send(error)
            }else if(resultsByUser.length >= 1){
                return res.send("userExist")
            }else{
                try {
                    dbConn.query("SELECT * FROM user WHERE email = ?", [email],  async(error, resultsByEmail) =>{
                        if(resultsByEmail.length >= 1){
                            return res.send("emailExist")
                        }else{
                            let hashedPassword =  await bcrypt.hash(password, 8);
                          
                            try {
                                dbConn.query("INSERT INTO user SET ?",{
                                    user: user,
                                    name: name,
                                    lastName: lastName,
                                    position:position,
                                    role: "user", 
                                    email: email,
                                    password: hashedPassword
                                }, (error, results) =>{
                                    if(results){
                                        return res.send("ok")
                                    }else{
                                        return res.send(error);
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
        })
    } catch (error) {

        return res.send(error);
    }
}