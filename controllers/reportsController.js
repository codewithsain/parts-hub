const PDFDocument = require('pdfkit');
const fs = require('fs');
const dbConn = require("../dbConnection");
const blobStream = require('blob-stream');

exports.getReport = (req, res) =>{
        
    
}

exports.getPartsCompleted = (req, res) =>{
    try {
        dbConn.query("SELECT partNumber FROM part WHERE status = 'completed'", (error, results) =>{
            if(error){
                return res.send(error)
            }else if(results){
                return res.send(results)
            }
        })
    } catch (error) {
        return res.send(error)
    }
}