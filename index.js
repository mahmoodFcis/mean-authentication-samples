const express = require("express");
const user = require("./controllers/user");
const mongoose = require("mongoose");
const config = require("config");
const mongoDebugger=require("debug")("mongo");
const appDebugger=require("debug")("index");

var app = express();
var log=require("./logs");


process.on("uncaughtException", function (err) {

    
    log.error(err);
    
});
process.on("unhandledRejection", function (ex) {
    appDebugger("unhandled rejection");
});



mongoose.connect(config.get("databaseServerUrl")).then(() => {
    mongoDebugger('is connected to mongo');
}).catch((ex) => {
    mongoDebugger(`cannot connect to mongo ${ex}`);
    process.exit();
});


app.use(express.json());
app.use('/apis/User/', user);

var portNumber = config.get("port");
app.listen(portNumber, () => {
    appDebugger(`listenning to port number ${portNumber}`);

});
