"use strict";
const mongoCollections = require("../config/mongoCollections");
const taskList = mongoCollections.taskList;
const users = require("./signin");
const uuid = require('node-uuid');

let exportedMethods = {

	getAllTasksForUser(id) {
		return users.getUserById(id).then((userTask) => {
			return taskList().then((taskCollection) => {
				return taskCollection.find({}).toArray().then((task) => {
					let taskArray = [];
					for (let i = 0; i < task.length; i++) {
						taskArray.push({ _id: task[i]._id, title: task[i].taskTitle, list: task[i].list, duedate: task[i].duedate, creatorID: task[i].creator[0].id });
					}
					let newFinalList = {
						_id: uuid.v4(),
						tasks: taskArray
					};

					return newFinalList;
				});
			});
		});
	}
}
module.exports = exportedMethods;