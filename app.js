const express = require("express");
const dbConn = require("./dbConnection");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const db = require("./dbConnection");
const hbs = require('hbs');





const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


app.set("view engine", "hbs");
console.log(__dirname);
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use("/", require("./routes/pages"));



function handleDisconnect(){
  dbConn.getConnection(function(err){
    try {
      if(err){
        console.log('error when connecting to db: ', err);
        setTimeout(handleDisconnect, 2000)
      }else{
        console.log('MySQL Connected...')
      }
    } catch (error) {
      
    }
   
  });

  try {
    dbConn.on('error', function(err){
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST'){
        handleDisconnect();
      }else{
        throw err
      }
    });
  } catch (error) {
    console.log(error)
  }
}

handleDisconnect();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server estarted on port 3000");
});
 