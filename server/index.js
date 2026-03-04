require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const config = require("./src/config");
const cookieParser = require("cookie-parser");
const { authUser } = require("./src/middleware/authMiddleware");
const cors = require("cors");

mongoose.connect(config.MONGO_URI).then(() => console.log("Connected!"));

const app = express();
const port = config.PORT;
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

const authRoutes = require("./src/routes/authRoutes");
const todoRoutes = require("./src/routes/todoRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/todos", authUser, todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

