
const dbConn = require("../dbConnection");

exports.getSuppliers = (req, res) => {

    try {
        dbConn.query("SELECT id, supplierName FROM supplier", (error, results) => {
            if (error) {
                return res.send(error)
            } else if (results) {
                return res.send(results)
            }
        })
    } catch (error) {
        return res.send(error)
    }
}


exports.getInfo = (req, res) => {

    const { id } = req.body;

    try {
        dbConn.query("SELECT supplierNumber, country, supplierCat, subCont FROM supplier WHERE id = ?", [id], (error, results) => {
            if (error) {
                return res.send(error)
            } else if (results) {
                console.log(results)
                return res.send(results)
            }
        })
    } catch (error) {
        return res.send(error)
    }
}


exports.getCurrentSupplier = (req, res) => {

    const { partNumber } = req.body;

    try {
        dbConn.query("SELECT id, supplierName, supplierNumber, country, supplierCat, subCont FROM supplier WHERE id = (select suppID from assignedsupp where partID = (select id from part  where partNumber = ?))", [partNumber], (error, results) => {
            if (error) {
                return res.send(error)
            } else if (results) {
                console.log(results)
                return res.send(results)
            }
        })
    } catch (error) {
        return res.send(error)
    }
}


exports.saveSupplier = (req, res) => {
    const { partNumber, suppID } = req.body;
    //ODO: HACER DIIFERENCIACION SI YA EXISTE UN REGISTRO CON ESA PARTE, SI EXISTE HACER UPDATE, SI NO, HACER UN INSERT
    try {
        dbConn.query("SELECT id FROM part WHERE partNumber = ?", [partNumber], (error, results) => {
            if (error) {
                return res.send(error)
            } else if (results) {
                let id = results[0].id;
                try {
                    dbConn.query("SELECT partID FROM assignedsupp WHERE partID = ?", [id], (error, results) => {
                        if(error){
                            console.log(error)
                            return res.send(error)
                        }else if (results.length >= 1) {
                            console.log(results.length)
                            try {
                                dbConn.query("UPDATE assignedsupp SET ? WHERE partID = ?", [{
                                    suppID: suppID,
                                    partID: id
                                }, id],
                                    (error, results) => {
                                        if (error) {
                                            console.log(error)
                                            return res.send(error)
                                        } else if (results) {
                                            return res.send("ok");
                                        }
                                    })
                            } catch (error) {
                                return res.send(error);
                            }
                        } else if (results.length <= 0) {
                            try {
                                dbConn.query("INSERT INTO assignedsupp SET ?", {
                                    suppID: suppID,
                                    partID: id
                                },
                                    (error, results) => {
                                        if (error) {
                                            return res.send(error)
                                        } else if (results) {
                                            return res.send("ok");
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
