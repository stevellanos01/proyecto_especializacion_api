const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ruta
app.get("/", (req, res) => {
  res.json({ message: "Welcome to remind application." });
});

// conexion mongodb
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.log("DB error: "));

// set puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}.`);
});
