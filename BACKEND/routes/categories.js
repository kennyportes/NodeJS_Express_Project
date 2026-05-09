const express = require("express");
const router = express.Router();
const db = require("../config/db");


//GET ALL CATEGORIES

router.get("/",(req, res)=>{
    db.query("SELECT * FROM categories",(err, result)=>{
        res.json(result);
    });
});
module.exports = router;