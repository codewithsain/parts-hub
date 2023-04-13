const express = require("express");
const dbConn = require("./dbConnection");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


app.set("view engine", "hbs");


app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

dbConn.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL Connected....");
  }
});

app.listen(3000, () => {
  console.log("Server estarted on port 3000");
});
 