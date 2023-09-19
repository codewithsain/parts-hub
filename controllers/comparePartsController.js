const dbConn = require('../dbConnection')



exports.getComparePart = (req, res) => {
    const { partNumber } = req.body

    try {
        dbConn.query(
            'SELECT id FROM part WHERE partNumber = ?',
            [partNumber],
            (error, results) => {
                if (error) {
                    return res.send(error)
                } else if (results) {
                    let id = results[0].id
                    try {
                        dbConn.query(
                            `select 
                    plant.plant,
                    part.description,
                    part.termCode,
                    part.netWeight,
                    part.grossWeight,
                    service.lsi,
                    service.gsi,
                    container.containerQuantity,
                    container.containerDesc,
                    container.roudingValue,
                    container.minLotSize,
                    supplier.supplierName,
                    supplier.supplierNumber
                from
                    part
                inner join plant on
                    part.plantID = plant.id
                inner join service on
                    part.id = service.partID
                inner join container on
                    part.containerID = container.id
                inner join assignedsupp on
                    part.id = assignedsupp.partID
                inner join supplier on
                    supplier.id = assignedsupp.suppID
                where
                    part.id = ?`,
                            [id],
                            (error, compareResults) => {
                                if (error) {
                                    return res.send(error)
                                } else if (compareResults) {
                                    return res.send(compareResults)
                                }
                            }
                        )
                    } catch (error) {
                        return res.send(error)
                    }

                }
            }
        )
    } catch (error) {
        return res.send(error)
    }
}

exports.getComparePartPrice = (req, res) => {
    const { partNumber } = req.body

    try {
        dbConn.query(
            'SELECT id FROM part WHERE partNumber = ?',
            [partNumber],
            (error, results) => {
                if (error) {
                    return res.send(error)
                } else if (results) {
                    let id = results[0].id
                    try {
                        dbConn.query(
                            `select tic from cost where partID = ? order by createDate desc limit 1`,
                            [id],
                            (error, priceResults) => {
                                if (error) {
                                    return res.send(error)
                                } else if (priceResults) {
                                    return res.send(priceResults)
                                }
                            }
                        )
                    } catch (error) {
                        return res.send(error)
                    }

                }
            }
        )
    } catch (error) {
        return res.send(error)
    }


}

exports.getCompareQuantities = (req, res) => {

    const { partNumber } = req.body

    try {
        dbConn.query(
            'SELECT id FROM part WHERE partNumber = ?',
            [partNumber],
            (error, results) => {
                if (error) {
                    return res.send(error)
                } else if (results) {
                    console.log(results)
                    let id = results[0].id
                    try {
                        dbConn.query(
                            `select globalEstimation, buyerEstimation from quantity where partID = ? order by createDate desc limit 1`,
                            [id],
                            (error, quantitiesResult) => {
                                if (error) {
                                    return res.send(error)
                                } else if (quantitiesResult) {
                                    console.log(quantitiesResult)
                                    return res.send(quantitiesResult)
                                }
                            }
                        )
                    } catch (error) {
                        return res.send(error)
                    }

                }
            }
        )
    } catch (error) {
        return res.send(error)
    }
    
}

exports.getECM = (req, res) => {

    try {
        dbConn.query(
            `select ecm from project`,
            (error, ecmResults) => {
                if (error) {
                    return res.send(error)
                } else if (ecmResults) {
                    return res.send(ecmResults)
                }
            }
        )
    } catch (error) {
        return res.send(error)
    }
}



exports.similarPart = (req, res) => {
    const { partNumber } = req.body

    try {
        dbConn.query(
            'SELECT similarPart FROM part WHERE partNumber = ?',
            [partNumber],
            (error, results) => {
                if (error) {
                    return res.send(error)
                } else if (results) {
                    let similarPartID = results[0].similarPart
                    try {
                        dbConn.query(
                            `select 
                    plant.plant,
                    part.description,
                    part.termCode,
                    part.netWeight,
                    part.grossWeight,
                    service.lsi,
                    service.gsi,
                    container.containerQuantity,
                    container.containerDesc,
                    container.roudingValue,
                    container.minLotSize,
                    supplier.supplierName,
                    supplier.supplierNumber
                from
                    part
                inner join plant on
                    part.plantID = plant.id
                inner join service on
                    part.id = service.partID
                inner join container on
                    part.containerID = container.id
                inner join assignedsupp on
                    part.id = assignedsupp.partID
                inner join supplier on
                    supplier.id = assignedsupp.suppID
                where
                    part.id = ?`,
                            [similarPartID],
                            (error, similarPartResults) => {
                                if (error) {
                                    return res.send(error)
                                } else if (similarPartResults) {
                                    return res.send(similarPartResults)
                                }
                            }
                        )
                    } catch (error) {
                        return res.send(error)
                    }

                }
            }
        )
    } catch (error) {
        return res.send(error)
    }
}

exports.getSimilarPartPrice = (req, res) => {
    const { partNumber } = req.body

    try {
        dbConn.query(
            'SELECT similarPart FROM part WHERE partNumber = ?',
            [partNumber],
            (error, results) => {
                if (error) {
                    return res.send(error)
                } else if (results) {
                    let similarPartID = results[0].similarPart
                    try {
                        dbConn.query(
                            `select tic from cost where partID = ? order by createDate desc limit 1`,
                            [similarPartID],
                            (error, similarPartPriceResults) => {
                                if (error) {
                                    return res.send(error)
                                } else if (similarPartPriceResults) {
                                    return res.send(similarPartPriceResults)
                                }
                            }
                        )
                    } catch (error) {
                        return res.send(error)
                    }

                }
            }
        )
    } catch (error) {
        return res.send(error)
    }


}

exports.getSimilarQuantities = (req, res) => {

    const { partNumber } = req.body

    try {
        dbConn.query(
            'SELECT similarPart FROM part WHERE partNumber = ?',
            [partNumber],
            (error, results) => {
                if (error) {
                    return res.send(error)
                } else if (results) {
                    console.log(results)
                    let similarPartID = results[0].similarPart
                    try {
                        dbConn.query(
                            `select globalEstimation, buyerEstimation from quantity where partID = ? order by createDate desc limit 1`,
                            [similarPartID],
                            (error, similarQuantitiesResults) => {
                                if (error) {
                                    return res.send(error)
                                } else if (similarQuantitiesResults) {
                                    console.log(similarQuantitiesResults)
                                    return res.send(similarQuantitiesResults)
                                }
                            }
                        )
                    } catch (error) {
                        return res.send(error)
                    }

                }
            }
        )
    } catch (error) {
        return res.send(error)
    }
    
}
