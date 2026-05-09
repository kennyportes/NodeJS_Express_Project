const express = require("express");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categories");
const questionRoutes = require("./routes/questions");

// route paths (VERY IMPORTANT)
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/questions", questionRoutes);

// start server 
app.listen(5000, () => {
  console.log("Server running on port 5000");
});