const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

// Routes
const routes = require("./routes");
const app = express();

//Middleware
//Implement cors
app.use(cors());
app.options("*", cors());

//cookie parser
app.use(cookieParser());
//Body parsser, reading  data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// serve static files
app.use('/', express.static(path.join(__dirname, 'build')));

// API ENDPOINT
app.use("/api", routes);


//Handling unexpected routes
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on this server`,
    });
});

module.exports = app;