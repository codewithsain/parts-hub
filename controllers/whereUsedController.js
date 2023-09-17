const dbConn = require("../dbConnection");

exports.getWhereUsed = (req, res) => {
    try {
        dbConn.query(`select
        distinct plant.plant,
        concat(supplier.supplierNumber , " - ", supplier.supplierName) as Supplier,
        part.termCode,
        part.termCodeDesc,
        part.globalEAU,
        cost.tic 
    from
        ((((part
    inner join plant on
        part.plantID  = plant.id)
    inner join cost on part.id = cost.partID) 
    inner join assignedsupp on
        part.id = assignedsupp.partID)
    inner join supplier on
        supplier.id = assignedsupp.suppID)
    group by
        part.partNumber`,
            (error, results) => {
                if (error) {
                    res.send(error);
                }
                res.send(results);
            });
    } catch (error) {
        res.send(error);
    }
}