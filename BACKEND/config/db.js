const mysql = require("mysql2");

// create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Jettaboostert3$",
    database: "forum_app"

});

//connect to  DB

db.connect(err =>{
    if(err)console.log(err);
    else console.log("Mysql Connected");
});

module.exports = db;