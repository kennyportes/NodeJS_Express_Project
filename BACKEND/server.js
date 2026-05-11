const express = require("express");
const cors = require("cors");

const app = express();

// 1. Updated CORS: This tells the server to specifically trust your React app
app.use(cors({
    origin: "http://localhost:5173", // Replace with your React URL if different
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/questions", require("./routes/questions"));
app.use("/api/answers", require("./routes/answers"));

// 2. Updated Listen: Using "0.0.0.0" makes the server easier to find for Axios
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Ready for connections from React!");
});