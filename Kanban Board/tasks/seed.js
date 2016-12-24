var dbConnection = require("../config/mongoConnection");
var data = require("../data/");
var users = data.signin;
var taskList = data.taskList;


dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        return users.addUser("Saloni", "Setia", "saloni.setia93@gmail.com", "student", ["saloni123", "saloni123"]);
    }).then((saloni) => {
        const id = saloni._id;

        return taskList.addTask(id, "tasktodo", "todo", "This is the TODO task!!", "12/31/2016", "11/18/2016", "low")
            .then(() => {
                return taskList.addTask(id, "task backup", "backup", "This is the BACKUP task!!", "01/11/2016", "12/18/2016", "high")
            }).then(() => {
                return taskList.addTask(id, "task doing", "doing", "This is the DOING task!!", "01/11/2016", "12/18/2016", "high")
            }).then(() => {
                return taskList.addTask(id, "task done", "done", "This TASK IS DONE!!", "01/11/2016", "12/18/2016", "high")
            })

    }).then(() => {
        return users.addUser("Ajay", "Shankar", "ajayshankar90@hotmail.com", "student", ["ajay123", "ajay123"]);

    }).then((ajay) => {
        const id = ajay._id;
        return taskList.addTask(id, "tasktodo", "todo", "This is the TODO task!!", "12/31/2016", "11/18/2016", "low")
    })
        .then(() => {
            console.log("Done seeding database");
            db.close();
        });


}, (error) => {
    console.error(error);
});