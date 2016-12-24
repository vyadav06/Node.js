const express = require('express');
const router = express.Router();
const data = require("../data");
const taskData = data.taskList;

router.get("/:id", (req, res) => {

    if (!req.params.id) {
        res.status(400).json({ error: "Please provide task id for getting the task details" });
        return;
    }

    taskData.getTaskById(req.params.id).then((task) => {
        res.render("TaskList/Task", { partial: "userProfile-scripts", tasks: task });
    }).catch(() => {
        res.status(404).json({ error: "Task not found" });
    });
});

router.get("/", (req, res) => {
    taskData.getAllTasks().then((taskList) => {
        res.render("TaskList/tasklistings", { partial: "userProfile-scripts", task: taskList });
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

router.post("/", (req, res) => {
    let blogTaskData = req.body;

    if (!blogTaskData) {
        res.status(400).json({ error: "Please provide inputs for the task" });
        return;
    }

    if (!blogTaskData.title) {
        res.status(400).json({ error: "Please provide a title for the task." });
        return;
    }

    if (!blogTaskData.description) {
        res.status(400).json({ error: "Please provide the description for the task" });
        return;
    }
    if (!blogTaskData.list) {
        res.status(400).json({ error: "Please provide the list for the task" });
        return;
    }

    if (!blogTaskData.duedate) {
        res.status(400).json({ error: "Please provide the duedate for the task" });
        return;
    }

    if (!blogTaskData.creationdate) {
        res.status(400).json({ error: "Please provide the creationdate for the task" });
        return;
    }

    if (!blogTaskData.priority) {
        res.status(400).json({ error: "Please provide the priority for the task" });
        return;
    }

    taskData.addTask(blogTaskData.creatorID, blogTaskData.title, blogTaskData.list, blogTaskData.description, blogTaskData.duedate, blogTaskData.creationdate, blogTaskData.priority)
        .then((newTask) => {
            res.json(newTask);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

router.put("/:id", (req, res) => {
    let updatedData = req.body;

    let getTask = taskData.getTaskById(req.params.id);

    if (!updatedData) {
        res.status(400).json({ error: "Please provide the data for updating a task" });
        return;
    }

    if (updatedData._id) {
        res.status(400).json({ error: "You cannot update the task Id" });
        return;
    }

    if (!req.params.id) {
        res.status(400).json({ error: "You must provide an ID for updating a task" });
        return;
    }

    getTask.then(() => {
        return taskData.updateTask(req.params.id, updatedData)
            .then((updatedTask) => {
                res.json(updatedTask);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "Task not found" });
    });

});

router.delete("/:id", (req, res) => {
    let getTask = taskData.getTaskById(req.params.id);

    if (!req.params.id) {
        res.status(400).json({ error: "Please provide an Id for the task that you wish to delete" });
        return;
    }

    getTask.then(() => {
        return taskData.removeTask(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "Task not found" });
    });
});

module.exports = router;