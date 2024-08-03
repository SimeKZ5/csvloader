const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);
app.use(express.json());

app.use("/api/licence", require("./routes/licenseRoutes"));
app.use("/api/korisnici", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
