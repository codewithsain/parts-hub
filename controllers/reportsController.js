
const dbConn = require("../dbConnection");
const PDF = require("pdfkit-construct")


exports.getReport =  (req, res) => {


    const { partNumber } = req.body;
    var partID = '';

    try {
        dbConn.query("select id from part where partNumber = ?", [partNumber],  (error, results) => {
            if (error) {
                return  error
            } else if (results.length > 0) {
                partID = results[0].id
                try {
                    dbConn.query(`select
                    part.partNumber,
                    part.description,
                    CT.tic,
                    QT.quotedEstimation,
                    plant.plant,
                    concat(supplier.supplierNumber, " - ", supplier.supplierName) as Supplier,
                    LTT.mRLT,
                    (CT.tic * QT.quotedEstimation) as TotalCost,
                    currency.currName,
                    part.userID,
                    concat(user.name, " " , user.lastName) as Name,
                    user.user,
                    part.updateDate
                from
                    part
                inner join (
                    select
                        tic,
                        partID,
                        createDate,
                        currencyID 
                    from
                        cost
                    where
                        createDate = (
                        select
                            max(createDate)
                        from
                            cost
                        where
                            partID = ${partID})) CT on
                    part.id = CT.partID
                inner join (
                    select
                        quotedEstimation,
                        partID,
                        createDate
                    from
                        quantity 
                    where
                        createDate = (
                        select
                            max(createDate)
                        from
                            quantity q 
                        where
                            partID = ${partID})) QT on
                    part.id = QT.partID
                inner join (
                    select
                        mRLT,
                        partID,
                        createDate
                    from
                        leadtime 
                    where
                        createDate = (
                        select
                            max(createDate)
                        from
                            leadtime
                        where
                            partID = ${partID})) LTT on
                    part.id = LTT.partID
                inner join plant on
                    part.plantID  = plant.id
                inner join assignedsupp on
                    part.id = assignedsupp.partID
                inner join supplier on
                    supplier.id = assignedsupp.suppID
                inner join currency on
                    currency.id = CT.currencyID
                inner join user on
                    user.id = part.userID`, (error, queryResults) =>{
                        

                        
                        const doc = new PDF({ bufferPage: true });

                        const stream = res.writeHead(200, {
                            'Content-Type': 'application/pdf',
                            'Content-disposition': `attachment;filename=part`
                        })
                    
                        doc.on('data', (data) => { stream.write(data) });
                    
                        doc.on('end', () => { stream.end() })
                    
                    
                    
                        const quotation = [
                            {
                                partNumber: queryResults[0].partNumber.toString(),
                                description: queryResults[0].description.toString(),
                                tic: queryResults[0].tic.toString(),
                                quotedEstimation: queryResults[0].quotedEstimation.toString(),
                                plant: queryResults[0].plant.toString(),
                                Supplier: queryResults[0].Supplier.toString(),
                                mRLT: queryResults[0].mRLT.toString(),
                                TotalCost: queryResults[0].TotalCost.toString(),
                                currency: queryResults[0].currName.toString()
                            }
                        ]
                    
                        doc.setDocumentHeader({
                            height: '25%'
                        }, () => {
                            doc.image('public/images/john-deere-logo-1.png', { width: 250, height: 40 })
                    
                            doc.text("  ", {
                                width: 420,
                                align: 'center',
                            })
                    
                            doc.fontSize(16).text("INVOICE", {
                                width: 420,
                                align: 'center',
                            })
                    
                            doc.text("  ", {
                                width: 420,
                                align: 'center',
                            })
                    
                    
                            doc.fontSize(12).text(`Quoted By: ${queryResults[0].Name} - ${queryResults[0].user}`, {
                                width: 420,
                                align: 'left',
                            })
                    
                            doc.fontSize(12).text(`Last Quoted Date Time: ${queryResults[0].updateDate}`, {
                                width: 420,
                                align: 'left',
                            })
                        })
                    
                    
                    
                        doc.addTable([
                            { key: 'partNumber', label: 'Part #', align: 'left', },
                            { key: 'description', label: 'Desc', align: 'left' },
                            { key: 'tic', label: 'Part Price', align: 'left' },
                            { key: 'quotedEstimation', label: 'Quan', align: 'left' },
                            { key: 'plant', label: 'To Unit', align: 'left' },
                            { key: 'Supplier', label: 'From Supp', align: 'left' },
                            { key: 'mRLT', label: 'Time', align: 'left' },
                            { key: 'TotalCost', label: 'Total', align: 'left' },
                            { key: 'currency', label: 'Currency', align: 'left' },
                        ], quotation, {
                            border: null,
                            width: "fill_body",
                            striped: true,
                            stripedColors: ["#f6f6f6", "#d6c4dd"],
                            cellsPadding: 10,
                            marginLeft: 45,
                            marginRight: 45,
                            headAlign: 'center',
                            fontSize: 8
                        })
                    
                        doc.render()
                    
                        doc.end();
                        
                    })
                } catch (error) {
                    return  error
                }
            }
        })
    } catch (error) {
       return  error
    }
    

   


}

exports.getPartsCompleted = (req, res) => {
    try {
        dbConn.query("SELECT partNumber FROM part WHERE status = 'completed'", (error, results) => {
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

