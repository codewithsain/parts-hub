const controller = {}
const dbConn = require("../dbConnection");

controller.list = (req, res, next) => {
    try {
        dbConn.query('SELECT * FROM user', async (error, results) => {
            console.log(results)
            next();
        })
    } catch (error) {
        console.log(error)
        next();
    }

}

controller.addUser = async (req, res) => {
    res.render("admin", {
        showModalUser: true
    })
}

controller.addFeature = async (req, res) => {
    res.render("admin", {
        showModalFeature: true
    })
}

module.exports = controller