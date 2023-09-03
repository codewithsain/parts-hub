const dbConn = require("../dbConnection");

exports.addCost = (req, res) =>{
    const {prodCostQual,
    supplierQuote ,
    experimentalSupplierQuote,
    shouldCost,
    shouldCostSource,
    unitCurrency,
    productionCost,
    experimentalCost,
    targetCost,
    surcharge,
    directMat,
    dirOverhead,
    perOverhead,
    tic,
    createDate,
    partNumber} = req.body;

    console.log(req.body)

    try {
        dbConn.query("SELECT id FROM part WHERE partNumber = ?", [partNumber], (error, results) =>{
            if(error){
                return res.send(error)
            }else if(results){
                let id = results[0].id;
                try {
                    dbConn.query("INSERT INTO cost SET ?", {prodCostQual: prodCostQual,
                        supplierQuote: supplierQuote,
                        expQuote: experimentalSupplierQuote,
                        shouldCost: shouldCost,
                        shouldCostSource: shouldCostSource,
                        currencyID: unitCurrency,
                        prodCost: productionCost,
                        expCost: experimentalCost,
                        targetCost: targetCost,
                        surcharge:surcharge ,
                        directMat: directMat,
                        dirOverhead: dirOverhead,
                        perOverhead: perOverhead,
                        tic: tic,
                        createDate: createDate, 
                        partID: id},
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
                    return res.send();
                }
            }
        })
    } catch (error) {
        return res.send(error);
    }
}

exports.getCosts = (req, res) =>{

    const {partNumber} = req.body;

    try {
        dbConn.query("SELECT id FROM part WHERE partNumber = ?", [partNumber], (error, results) =>{
            if(error){
                return res.send(error)
            }else if(results){
                let id = results[0].id;
                try {
                    dbConn.query("SELECT id, prodCostQual, supplierQuote, expQuote,  shouldCost, shouldCostSource, currencyID, prodCost,expCost, targetCost,surcharge, directMat, dirOverhead, perOverhead, tic,convert_tz(createDate,'+00:00','-06:00') as createDate FROM cost  WHERE partID = ? ORDER BY createDate DESC", [id] ,(error, results) =>{
                        if(error){
                            console.log(error)
                            return res.send(error)
                        }else if(results){
                            console.log(results)
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

exports.deleteCost = (req, res) =>{
    const {id} = req.body;

    try {
        dbConn.query("DELETE FROM cost WHERE id = ?", [id], (error, results) =>{
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