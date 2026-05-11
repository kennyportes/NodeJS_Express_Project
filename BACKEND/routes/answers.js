const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET answers
router.get("/:questionId", (req, res) => {
  db.query(
    "SELECT * FROM answers WHERE question_id=?",
    [req.params.questionId],
    (err, result) => {
      res.json(result);
    }
  );
});

// ADD answer
router.post("/", (req, res) => {
  const { question_id, user_id, answer } = req.body;
   console.log("Incoming:", req.body); 

  db.query(
    "INSERT INTO answers (question_id, user_id, answer) VALUES (?, ?, ?)",
    [question_id, user_id, answer],
    (err, result) => {
      res.json({ message: "Answer added" });
    }
  );
});

module.exports = router;