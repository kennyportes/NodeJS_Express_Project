const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET questions
router.get("/:categoryId", (req, res) => {
  const { categoryId } = req.params;

  db.query(
    "SELECT * FROM questions WHERE category_id=? ORDER BY created_at DESC",
    [categoryId],
    (err, result) => {
      res.json(result);
    }
  );
});

// ADD question
router.post("/", (req, res) => {
  const { user_id, category_id, question } = req.body;

  db.query(
    "INSERT INTO questions (user_id, category_id, question) VALUES (?, ?, ?)",
    [user_id, category_id, question],
    (err, result) => {
      res.json({ message: "Question added" });
    }
  );
});

module.exports = router;