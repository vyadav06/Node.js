const express = require('express');
const router = express.Router();
const data = require("../data");
const taskData = data.list;


router.get("/:id", (req, res) => {
    taskData.getAllTasksForUser(req.params.id).then((taskList) => {
        tasks = taskList.tasks
        var todoTasks = []
        var backupTasks = []
        var doneTasks = []
        var doingTasks = []
        var userID = req.params.id
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].list == "todo" && tasks[i].creatorID == userID) {
                todoTasks.push(tasks[i])
            }
            if (tasks[i].list == "backup" && tasks[i].creatorID == userID) {
                backupTasks.push(tasks[i])
            }
            if (tasks[i].list == "done" && tasks[i].creatorID == userID) {
                doneTasks.push(tasks[i])
            }
            if (tasks[i].list == "doing" && tasks[i].creatorID == userID) {
                doingTasks.push(tasks[i])
            }
        }
        res.render("list/list", { partial: "userProfile-scripts", taskID: req.params.id, todo: todoTasks, backup: backupTasks, done: doneTasks, doing: doingTasks });
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

router.get("/calendardata/:id", (req, res) => {
    taskData.getAllTasksForUser(req.params.id).then((taskList) => {
        var tasks = taskList.tasks
        var calendarTasks = []
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].creatorID == req.params.id) {
                calendarTasks.push(tasks[i])
            }
        }
        res.json(calendarTasks);

    });
});
router.get("/calendar/:id", (req, res) => {
    res.render("calendar/MonthlyView", { partial: "MonthlyView-scripts", id: req.params.id });


});
module.exports = router;