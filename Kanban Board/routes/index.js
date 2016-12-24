const express = require('express');
var router = express.Router();
var userRoutes = require("./users");
var signinRoutes = require("./signin");
var taskRoutes = require("./taskList");
var listRoutes = require("./list");

var constructorMethod = (app) => {
    app.use("/signup", signinRoutes);
    app.use("/users", userRoutes);
    app.use("/taskList", taskRoutes);
    app.use("/list", listRoutes);


    app.use("*", (req, res) => {
        res.render("signin/initial", { partial: "signin-scripts" });
    })
};


module.exports = constructorMethod;

