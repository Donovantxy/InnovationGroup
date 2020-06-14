# App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.

## Development server


1 - Make sure you have **`git`** and **`npm`** installed on your machine

2 - Run `git clone git@github.com:Donovantxy/InnovationGroup.git`

3 - Go to the folder `InnovationGroup` and run `npm install`

4 - Run the application:
 1. WITH SERVER (NodeJs server) on **`master`** branch.
  Run `npm run server`: the server will run on port `5555` and the front-end app will get open within the default browser on `http://localhost:5550/` (depending on machine proxy.config.json might need a small change).
 
 2. WITHOUT SERVER (taking data from a constant withing the frontend app) on **`master-no-server`** branch.
  Run `npm start` the front-end app will get open within the default browser on `http://localhost:5550/`.

NOTE: running the front-end with the serveer for the first time app might takes 20-30secs