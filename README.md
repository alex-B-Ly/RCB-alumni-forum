RCB-alumni-forum
first draft of README.md by Carolyn

Rutgers Coding Bootcamp Alumni Forum

This is a node.js forum application powered by Angular and Express. The central purpose of the RCB Alumni Forum is to provide a networking space that will encourage an ongoing dialogue between RCB Alumni as they search for internships, employment, become established in a new position, and continue to look for new opportunities.

RCB Alumni Forum will provide the main functions that users would expect from a forum, such as starting a discussion thread, posting comments to an active thread, (an admin system), and the ability to customize your personal profile with an avatar, contact information, job title, list of skills, and recent projects.

Demo You can test a fully working live demo at ( )

Features ( Emoji support, only if theres time for it.) ( user @mentioning, again, only if there is time after building the forum out, and testing) (both of these features could easily be added in subsequent versions, if we dont have time to do it now.)

Admin commands: (we might not have time for this, but we should probably have some admin commands set up)

COMMAND VARIABLES DESCRIPTION /alert [message] Sends global [message] /kick [user] Kicks [user] from server /ban [user] [minutes] Bans[user] from server for [minutes] /role [user] [1-3] Changes[user] admin permissions

3 Admin Levels:

*Helper: Can delete posts. *Moderator: Can delete posts, and kick/ ban users. *Admin: All of the above, plus the ability to send global alerts (and promote/demote users)

HOMEPAGE - login / register Forum Guidelines (hidden in model, click to show) list of members public facing messages RCB facing messages (by class section)

MEMBER PROFILE - contact info section (including Github / linkedIn links)

Setup Clone this repository to your desktop and run npm install to install all the dependencies.

Check config.json to change the port you want to use.

Usage After you clone this respository to your deskop, go to its root dir and run npm install to ensure all dependencies are installed.

One the dependencies are installed, you can run npm start to start the application. You will then be able to access it at localhost:3000

To give yourself admin permissions on the forum, you will have to type /role [your-name] in the app console.

Front End Technologies CSS Framework - Bootstrap CSS pre-processor - Sass (SCSS) JS Framework - Angular API - GitHub (API - Linked In?) (login with Github?

Back End Technologies DB - MongoDB node NPM packages including; express body-parser morgan mongoose passport passport-local bcrypt socket.io

Contributors

Alex Ly Carolyn Tevnan Chris Campbell Marco Sebello
