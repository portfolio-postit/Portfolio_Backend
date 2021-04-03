const express = require("express");
const mongoose = require("mongoose");

const cors = require('cors')
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const connect = mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', require('./routes'));

app.set("jwt-secret", process.env.JWT_SECRET);
app.set("refresh-secret", process.env.REFRESH_SECRET);

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
});