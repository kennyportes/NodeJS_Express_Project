const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/:categoryId", (req, res) => {
  const { categoryId } = req.params;
  db.query(
    "SELECT * FROM questions WHERE category_id=?",
    [categoryId],
    (err, result) => {
      if (err) return res.json(err);
      res.json(result);
    }
  );
});
module.exports = router;