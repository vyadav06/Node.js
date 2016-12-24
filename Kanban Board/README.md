# Kanban_CS546
Final project for CS546, Fall 2016
Introduction
We have built a web application similar to a Kanban Board. Users can have different tasks in different lists which they can prioritize, maintain and update as and when they want. It is a much simpler version of the Kanban board, which almost every student, or for that matter every person uses to simplify their everyday life.
Proposal
A Kanban board web application.
Features of the System
Core:
1. Create profile 2. Login 3. Manage profile 4. Create task and assign it to one of the 4 different lists: a. Backup (Listing all the tasks that need to be done)
b. To do (Listing tasks to be done today or in the next few days) c. Doing (Tasks in progress; must not be more than 5) d. Done (Completed tasks)
5. Prioritizing tasks by the user according to what suits him. 6. View the tasks in a calendar based on it’s due date.7. Reminder emails to users for tasks nearing the due date. 8. Congratulatory emails to users when they complete all tasks in the list.


Team Members:
Saloni Setia - Web 
Shradha Nayak - Web 
AjayShankar Arumugam - Web 
Vandna Yadav - Web 
Muskaan Mulchandani – Main Campus

Steps to install and run the application:
1. Install all the required packages using npm install command.
2. Start mongodb.
3. Start the application by using npm start command.
4. Seed the database using the command: node ./tasks/seed.js
5. Once the server is up, we can request the path in browser. http://localhost:3000 which will take us to the initial 'KANBAN BOARD' page.

Guide for the Application:
1.If you are a new user, please select sign up link in the initial page and enter all your details. 
2.Once you have signed up, enter email id and password and Sign-in to the website. 
3.After signing in, user can view their profile by clicking on My Profile.
4.In My Profile, click on 'View Lists' to view the four lists i.e. Backup, Doing, Todo, Done. These lists will contain tasks and you can click on the task to view the details or you may choose to Logout from that page by clicking on Logout. 
5.On the list page, ther is a 'Create/View Tasks in Calender' link which you can click to view tasks present in a month. For viewing the task details of a particular day, you can click on that day. 
6.In the Calendar view, there is an 'Add Task' button which can be used for adding a Task by specifying the task details. There are separate icons for each list type for easy readability of the user.
7.Once the task has been added in the Calendar view, it will also be displayed on the list page under the list type.
8.On the homepage, there is a 'Delete Account' button for deleting your account.
9.If the user completes the task on time, a congratulatory email will be sent or if the task is incomplete reminder email will be sent on users emailid.

* The application tested using Chrome browser.

On successful db seed:
1. 2 users are created. User 'Saloni' has 4 tasks i.e. 1 in each list and user Ajay has no tasks.
2. The user credentials are: 
   UserName 					Password
   saloni.setia93@gmail.com     saloni123
   ajayshankar90@hotmail.com	ajay123

*Once the db seed is done, the above information can be tested in the application and tasks can be added for the users.