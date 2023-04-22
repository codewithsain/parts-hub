const controller = {}
const dbConn = require("../dbConnection");

controller.list = (req, res) => {
    try {
        dbConn.query('SELECT * FROM user', async (error, results) => {
            console.log(results)
        })
    } catch (error) {
        console.log(error)
    }

    res.render("admin");
    
}

controller.addUser = async (req, res) => {
    res.render("admin", {
        showModalUser: true
    })
}

controller.closeModal = (req, res) => {
    res.render("admin");
}

controller.addFeature = async (req, res) => {
    res.render("admin", {
        showModalFeature: true
    })
}

module.exports = controller