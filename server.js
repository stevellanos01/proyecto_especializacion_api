const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const authRoute = require('./routes/authRoute')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authRoute);

// ruta
app.get("/", (req, res) => {
  res.json({ message: "Welcome to remind application." });
});

// conexion mongodb
mongoose
  .connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.5cayq.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.log("DB error: ", error));

// set puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}.`);
});

module.exports = app;