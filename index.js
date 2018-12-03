const express = require("express");
const user = require("./controllers/user");
const mongoose = require("mongoose");
const config = require("config");
var app = express();
var log=require("./logs");


process.on("uncaughtException", function (err) {

    
    log.error(err);
    
});
process.on("unhandledRejection", function (ex) {
    console.log("unhandled rejection");
});

throw new Error("error at index.js");

mongoose.connect(config.get("databaseServerUrl")).then(() => {
    console.log('is connected to mongo');
}).catch((ex) => {
    console.log(`cannot connect to mongo ${ex}`);
    process.exit();
});


app.use(express.json());
app.use('/apis/User/', user);

var portNumber = config.get("port");
app.listen(portNumber, () => {
    console.log(`listenning to port number ${portNumber}`);

});
