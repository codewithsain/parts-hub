const dbConn = require("../dbConnection");

exports.getDataForChart = (req, res) =>{
    const {partID, chartType} = req.body;


    switch (chartType) {
        case 'cost':
            try {
                dbConn.query(`select tic as Result, createDate  from cost where partID = ?`, [partID] ,(error, results) =>{
                    console.log(results)
                    return res.send(results)
                })
            } catch (error) {
                return res.send(error)
            }
            break;
        case 'leadtime': 
        try {
            dbConn.query(`select mRLT as Result, createDate  from leadtime where partID = ?`, [partID] ,(error, results) =>{
                console.log(results)
                return res.send(results)
            })
        } catch (error) {
            return res.send(error)
        }
            break;
        case 'quantity':
            try {
                dbConn.query(`select quotedEstimation as Result, createDate  from quantity where partID = ?`, [partID] ,(error, results) =>{
                    console.log(results)
                    return res.send(results)
                })
            } catch (error) {
                return res.send(error)
            }
            break;
        default:
            break;
    }
   
}