const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require('node-uuid');
var bcrypt = require("bcrypt-nodejs");

var exportmethods =
    {
        getAllUsers() {
            return users().then((userdata) => {
                return userdata.find({}).toArray();
            });
        },

        checkUser(emailID, available) {
            return users().then((memberCollection) => {
                return memberCollection.findOne({ email: emailID }).then((userinfo) => {
                    if (userinfo && available == 'Y') {
                        return true;
                    }
                    else if (userinfo && available == 'N') {
                        throw "User already exists! Please try with a different Email ID !";
                    }
                    else if (!userinfo && available == 'Y') {
                        throw "Invalid credentials";
                    }
                    else if (!userinfo && available == 'N') {
                        return true;
                    }

                })
            });
        },

        validateUser(userData) {
            return users().then((memberCollection) => {
                return memberCollection.findOne({ email: userData.email }).then((userinfo) => {
                    return userinfo;
                })
            });
        },


        getUserById(id) {
            return users().then((userdata) => {
                return userdata.findOne({ _id: id }).then((user) => {
                    if (!user) throw "User Does not exist";
                    return user;

                });

            });
        },

        getUserBySessionId(id) {

            return users().then((session) => {
                return session.findOne({ sessionId: id }).then((user) => {
                    if (!user) throw "User with given session id not found";
                    return user;
                });
            });

        },

        updateSession(userObj) {
            return users().then((userCollection) => {
                return userCollection.updateOne({ _id: userObj._id }, userObj).then(function () {
                    return userObj;
                });
            });
        },


        addUser(firstName, lastName, email, occupation, password) {
            var hash = bcrypt.hashSync(password[0]);
            return users().then((userdata) => {
                var newUser = {

                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    occupation: occupation,
                    password: hash,
                    _id: uuid.v4(),
                    sessionId: uuid.v4(),
                    tasks: []

                };
                return userdata.insertOne(newUser).then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                }).then((newId) => {
                    return this.getUserById(newId);
                });

            });
        },


        updateUser(id, firstName, lastName, email, occupation) {

            return this.getUserById(id).then((userdata) => {
                var updatedetails = {};

                if (newdetails.firstName) {
                    updatedetails.firstName = newdetails.firstName;
                }

                if (newdetails.lastName) {
                    updatedetails.lastName = newdetails.lastName;
                }

                if (newdetails.email) {
                    updatedetails.email = newdetails.email;
                }

                if (newdetails.occupation) {
                    updatedetails.occupation = newdetails.occupation;
                }

                var updateCommand =
                    {
                        $set: updatedetails
                    };

                return userdata.updateOne({ _id: id }, updateCommand).then(() => {
                    return this.getUserById(id);
                });
            });
        },

        addTaskToUser(id, taskId, taskTitle, creatorName, creatorEmail, description, duedate, creationdate, priority) {
            return this.getUserById(id).then((currentUser) => {

                return userdata.updateOne({ _id: id }, {
                    $addToSet: {
                        tasks: {
                            id: taskId,
                            title: taskTitle,
                            creator: [
                                {
                                    creatorName: creatorName,
                                    creatorEmail: creatorEmail,
                                    id: id

                                }
                            ],
                            description: description,
                            duedate: duedate,
                            creationdate: creationdate,
                            priority: priority

                        }
                    }
                });
            });
        },

        removeUser(id) {
            return users().then((userCollection) => {
                return userCollection.removeOne({ _id: id }).then((deleteinfo) => {
                    if (deletionInfo.deletedCount === 0) {
                        throw "Could not delete member with id of " + id
                    }
                })
            })

        }




    }


module.exports = exportmethods;