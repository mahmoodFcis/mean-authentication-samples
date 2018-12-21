const express = require("express");
const user = require("./controllers/user");
const mongoose = require("mongoose");
const config = require("config");
const mongoDebugger=require("debug")("mongo");
const appDebugger=require("debug")("index");
const helmet=require("helmet");

var app = express();
app.use(helmet());
var log=require("./logs");

mongoose.connect(config.get("databaseServerUrl")).then(() => {
    mongoDebugger('is connected to mongo');
}).catch((ex) => {
    mongoDebugger(`cannot connect to mongo ${ex}`);
    process.exit();
});


app.use(express.json());
app.use('/api/Users/',user);

var portNumber = config.get("port");
var server=app.listen(portNumber, () => {
    console.log(`listenning to port number ${portNumber}`);

});

console.log("environment is now: "+ app.get("env"));
module.exports=server;
