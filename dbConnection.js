const mysql = require("mysql");
const dotenv = require('dotenv')
dotenv.config({path: './.env'})
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});

module.exports = db