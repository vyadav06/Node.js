var express = require('express');
var router = express.Router();
var data = require("../data");
var userData = data.signin;
var async = require("async");
var xss = require("xss");
const taskData = data.list;

router.get("/:id", (req, res) => {

    if (xss(req.params.id) == "profile") {
        userData.getUserBySessionId(req.cookies.sessionId).then((userInfo) => {
            userData.getUserById(userInfo._id).then((user) => {
                res.render("user/profile", { partial: "signin-scripts", userInfo: user, checkListValue: "profile", userType: true });
            }).catch((e) => {
                res.render("error/errorpage", { partial: "signin-scripts", invalidUser: false, error: e });//Technical error
            });
        }).catch((e) => {
            res.render("error/errorpage", { partial: "signin-scripts", invalidUser: false, error: e });
        })



    } else if (xss(req.params.id) == "users") {
        userData.getUserBySessionId(req.cookies.sessionId).then((userInfo) => {
            userData.getUserById(userInfo._id).then((user) => {
                res.render("user/users", { partial: "userProfile-scripts", users: user, checkListValue: "profile", userType: true });
            }).catch((e) => {
                res.render("error/errorpage", { partial: "signin-scripts", invalidUser: false, error: e });//Technical error
            });
        });
    }

});

router.get("/", (req, res) => {
    userData.getAllUsers().then((userList) => {
        res.json(userList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

router.post("/", (req, res) => {

    var newuserData = req.body; // getting the request body from the post data 

    if (!newuserData[0]) {
        res.status(400).json({ error: "You must provide data to create a user" });
        return;
    }

    if (!newuserData[0].firstName) {
        res.status(400).json({ error: "You must provide a first name" });
        return;
    }

    if (!newuserData[0].lastName) {
        res.status(400).json({ error: "You must provide a last name" });
        return;
    }

    if (!newuserData[0].email) {
        res.status(400).json({ error: "You must provide a valid email id" });
        return;
    }

    if (!newuserData[0].occupation) {
        res.status(400).json({ error: "You must provide a valid occupation detail" });
        return;
    }


    userData.addUser(newuserData[0].firstName, newuserData[0].lastName, newuserData[0].email, newuserData[0].occupation, newuserData[0].password)
        .then((newUser) => {
            res.json(newUser);
        }, () => {
            res.sendStatus(500);
        });
});

module.exports = router;