const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(cookieParser());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");

const DATABASE_URL = process.env.DATABASE;
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.static(path.join(__dirname, "public")));
app.use("/", userRoutes);

app.get("/*", express.static(path.join(__dirname, "build")));

app.listen(8000, () => console.log("Server is running on 8000 port"));
