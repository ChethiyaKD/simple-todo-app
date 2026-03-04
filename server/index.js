require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const config = require("./src/config");
const cookieParser = require("cookie-parser");
const { authUser } = require("./src/middleware/authMiddleware");

mongoose.connect(config.MONGO_URI).then(() => console.log("Connected!"));

const app = express();
const port = config.PORT;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const todoRoutes = require("./src/routes/todoRoutes");

app.use("/api/todos", authUser, todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

