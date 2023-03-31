const express = require("express");
const dbConn = require("./dbConnection");
const app = express();
const path = require('path');

dbConn.connect( (error) =>{
    if(error){
        console.log(error);
    }else{
        console.log("MySQL Connected....")
    }
})

const publicDirectory = path.join(__dirname, './public');
app.set('view engine', 'hbs');
console.log(__dirname)
app.use(express.static(publicDirectory))
app.get("/", (req, res) => {
  //res.send("<h1>Home Page</h1>");
  res.render("index");
});

app.listen(3000, () => {
    console.log("Server estarted on port 3000")
});
