const express = require("express");
const cors = require("cors");
const messages = require("./helpers/messages");
let app = express()

// user parse md
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use cors policy
app.use(cors())

// require db
require("./config/database")

require("./routes")(app)

app.use((req, res, next) => {
    console.log(req.method)
    console.log(req.url)
    res.status(404).json({
        success: false,
        message: "not found"
    })
});

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.httpStatusCode || 500).json({
        success: false,
        error: err.description || messages.serverError
    });
})

module.exports = app;