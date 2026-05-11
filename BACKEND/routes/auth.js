const express = require ("express");
const router = express.Router();
const db = require ("../config/db");


//Register
router.post("/register", (req, res)=>{
    const{username, password} = req.body;
    db.query(
        "INSERT INTO users (username,password) VALUES (?, ?)",
        [username, password],
        (err, result)=> {
            if(err)return res.json({error: "User exist"});
            res.json({message: "Resgister successfully "});
        }
    );
});

//LOGIN
router.post ("/login", (req,res)=>{
    const{username, password} = req.body;
    db.query(
        "SELECT * FROM users WHERE username=? AND password=?",
        [username, password],
        (err,result)=>{
            if (result.length>0){
                res.json({success: true, user: result[0]});
            }
            else{
                res.json({success: false,message: "invalid login"});
            }
        }
    );
});
module.exports = router;