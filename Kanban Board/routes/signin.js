var express = require('express');
var router = express.Router();
var data = require("../data");
var userData = data.signin;
var fs = require('fs');
var bcrypt = require("bcrypt-nodejs");
var uuid = require('node-uuid');
var xss = require('xss');

router.get("/initial", (req, res) => {
    res.render("signin/initial", { partial: "signin-scripts" });
})
router.get("/membersign", (req, res) => {
    res.render("signin/membersignup", { partial: "memberSignup-scripts", createorUpdate: "Y" });
});

router.get("/deletedprofile", (req, res) => {
    res.render("signin/deleteorlogout", { partial: "signin-scripts", delete: true });
});

router.get("/logout", (req, res) => {
    if (req.cookies.sessionId) {
        var expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() - 1);
        res.cookie("sessionId", "", { expires: expiresAt });
        res.clearCookie("sessionId");
    }
    res.render("signin/deleteorlogout", { partial: "signin-scripts", logout: true });
});

router.get("/memberupdate", (req, res) => {
    userData.getUserBySessionId(req.cookies.sessionId).then((memberInfo) => {
        if (memberInfo) {
            userData.getUserById(memberInfo._id).then((userInfo) => {
                res.render("signin/membersignup", { partial: "memberSignup-scripts", createorUpdate: "N", firstName: memberInfo.firstName, lastName: memberInfo.lastName, email: memberInfo.email, occupation: memberInfo.occupation, password: memberInfo.password });
            }).catch((e) => {
                res.render("error/errorpage", { partial: "signin-scripts", invalidUser: false, error: e });
            });
        }
    }).catch((e) => {
        res.render("error/errorpage", { partial: "signin-scripts", invalidUser: true, error: e });
    })
});

router.post("/validateUser", (req, res) => {
    var userDet = req.body;
    var checkUser = userData.checkUser(userDet.email, "Y");

    checkUser.then((value) => {
        return userData.validateUser(userDet).then((memberObj) => {
            bcrypt.compare(userDet.password, memberObj.password, function (err, response) {
                if (response == true) {
                    memberObj.sessionId = uuid.v4(); // setting the session ID once the user name and password matches.
                    userData.updateSession(memberObj).then((updatedObj) => {
                        res.cookie("sessionId", updatedObj.sessionId);
                        res.json({ success: true });
                    }).catch((e) => {
                        res.json({ error: true, message: "Error in validating a user information" });
                    });
                } else {
                    res.json({ error: true, message: "Invalid credentials" });
                }
            })
        }).catch((e) => {
            res.json({ error: true, message: e });
        })

    }).catch((e) => {
        res.json({ error: true, message: e });
    });

});

router.post("/memberSignup", (req, res) => {
    var signupData = req.body;

    if (signupData.createorUpdateBack == 'Y') {
        var checkUser = userData.checkUser(signupData.email, "N");

        checkUser.then(() => {
            return userData.addUser(signupData.firstName, signupData.lastName, signupData.email, signupData.occupation, signupData.password).then((newMember) => {
                res.render("signin/membersignup", {
                    success: true, result: "You have been successfully added !", createorUpdate: "Y", partial: "memberSignup-scripts",
                    firstName: xss(newMember.firstName), lastName: xss(newMember.lastName), email: xss(newMember.email),
                    occupation: newMember.occupation, password: newMember.hashedPassword
                });
            }).catch((e) => {
                res.render("signin/membersignup", { error: e, partial: "memberSignup-scripts", createorUpdate: "Y", firstName: xss(signupData.firstname), lastName: xss(signupData.lastname), email: xss(signupData.email), occupation: xss(signupData.occupation), password: signupData.password });
            });
        }).catch((e) => {
            console.log(e);
        });
    }

    else {
        return userData.getUserBySessionId(req.cookies.sessionId).then((user) => {
            return userData.updateUser(user._id, signupData.firstName, signupData.lastName, signupData.email, signupData.occupation, signupData.password).then((updatedMember) => {
                res.render("signin/membersignup", {
                    success: true, result: "Your information is updated successfully ! Please sign in again !", createorUpdate: "N", partial: "memberSignup-scripts",
                    firstName: xss(updatedMember[0].firstName), lastName: xss(updatedMember[0].lastName),
                    email: xss(updatedMember[0].email), occupation: xss(updatedMember[0].occupation), password: updatedMember[0].hashedPassword
                });



            }).catch((e) => {
                res.render("signin/membersignup", {
                    error: e, message: e, createorUpdate: "N", partial: "memberSignup-scripts", firstName: xss(signupData.firstname), lastName: xss(signupData.lastname),
                    email: xss(signupData.email), occupation: xss(signupData.occupation), password: signupData.password
                });
            });

        }).catch((e) => {
            console.log(e)
            res.json({ error: e });
        });

    }



});

router.delete("/delete", (req, res) => {
    var member = userData.getUserBySessionId(req.cookies.sessionId);
    member.then((memberObj) => {
        return userData.removeUser(memberObj._id).then(() => {
            if (req.cookies.sessionId) {
                var expiresAt = new Date();
                expiresAt.setHours(expiresAt.getHours() - 1);
                res.cookie("sessionId", "", { expires: expiresAt });
                res.clearCookie("sessionId");
            }
            res.json({ success: true });
        }).catch((e) => {
            res.json({ error: e });
        });
    }).catch((e) => {
        res.render("error/errorpage", { partial: "signin-scripts", invalidUser: true, error: e });
    });
});

module.exports = router;