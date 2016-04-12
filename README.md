# Rutgers Coding Bootcamp Alumni Chat


This is a node.js chatroom application powered by Angular and Express. The central purpose of the RCB Alumni Chat is to provide a networking space that will encourage an ongoing dialogue between RCB Alumni as they search for internships, employment, become established in a new position, and continue to look for new opportunities.

RCB Alumni Chat will provide the main functions that users would expect from a chatroom, such as the ability to send, recieve, and edit messages, and the ability to customize your personal profile with an avatar, contact information, job title, list of skills, and recent projects.


Features: 
Admin System, Emoji support, user @mentioning

Admin Commands:
COMMAND VARIABLES DESCRIPTION /alert [message] Sends global [message] /kick [user] Kicks [user] from server /ban [user] [minutes] Bans[user] from server for [minutes] /role [user] [1-3] Changes[user] admin permissions

Admin Levels:
Helper: Can delete posts.
Moderator: Can delete posts, and kick/ ban users. 
Admin: All of the above, plus the ability to send global alerts, and promote or demote users.

Demo:
You can test a fully working live demo at ( )

Setup:
Clone this repository to your desktop and run npm install to install all the dependencies.
Check config.json to change the port you want to use.

Usage:
After you clone this respository to your deskop, go to its root dir and run npm install to ensure all dependencies are installed.

One the dependencies are installed, you can run npm start to start the application. You will then be able to access it at localhost:8080

To give yourself admin permissions on the forum, you will have to type /role [your-name] in the app console.

Front End Technologies:
CSS, Bootstrap, Javascript

Back End Technologies: 
MongoDB, AngularJS, Node, NPM packages: express, body-parser, multer, morgan, mongoose, passport, passport-local, bcrypt, connect-flash, MongoStore, cookie-parser, express-session, socket.io

Contributors:
Alex Ly, Carolyn Tevnan, Chris Campbell, Marco Sebello