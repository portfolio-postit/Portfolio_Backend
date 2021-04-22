const express = require("express");
const { sequelize } = require("./entities/models");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());

app.use("/", require("./routes"));

app.set("jwt-secret", process.env.JWT_SECRET);
app.set("refresh-secret", process.env.REFRESH_SECRET);

sequelize.sync();

app.listen(5000, () => {
  console.log("server start..");
});
