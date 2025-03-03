const express = require("express");// import (sortof)
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();  // dotenv is a package helps me to fetch the port details from env file, generally these ports are declared into .env files
const errorHandler = require("./middleware/errorHandler");
console.log("PORT from .env:", process.env.PORT);


connectDb();
const app = express(); // instantiating 

const port = process.env.PORT || 5000;// server will run on this port or listens to this port

app.use(express.json()); // MIDDLEWARE #1, parsing is important to accept the body from the client. this is most importannt task to 
// parse the data first and then sending it further to require, so this is #1 MIDDLEWARE
app.use("/api/contacts", require("./routes/contactroutes"))// #2  MIDDLEWARE
app.use("/api/users", require("./routes/userRoutes"))// #authentication middleware
app.use(errorHandler) 

app.listen(port, () => {
    console.log(`Server running on the port ${port} `)
})// callback function inside


