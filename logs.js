const fs = require("fs");
const winston=require("winston");
const pino=require("pino")();
require("pino-pretty");
require("winston-mongodb");

winston.add(new winston.transports.File({filename:"./logs/winstonlog.txt"}));
winston.add(new winston.transports.MongoDB({db:"mongodb://localhost/logs"}));
module.exports = {
    info(msg) {
        fs.writeFile("./logs/info.txt", msg, function (err) {
            if (err) {
                winston.error("an error occurred while writing to the log file");
                
            }
            winston.log(`attempted to write an info to the text file`);
            pino.log("this is a from log using pino package");
        })
    }
,
    warning(warnMs) {
        fs.writeFile("./logs/warning.txt", warnMs, function (err) {
            
                winston.log("attempted to write to the log text file ");
               
           
        })
    },
    error(e) {
        fs.writeFile("./logs/error.txt", e, function (err) {
            if (err) {
                winston.error(`an error occurred while writing a warning to the log file with this error ${err}`);
            }
            pino.info("this is a from log using pino package");
            winston.info("attempted to write an error to the error.txt");
        })
    }
}


// export class log {
//     constructor() {
//         this.name = "";
//     }

//     info(msg) {
//             fs.writeFile("./logs/info.txt", msg, function (err) {
//                 if (err) {
//                     console.error(`an error occurred while writing info to the log file with this error ${err}`);
//                 }
//             })
//         },
//         warning(warnMs) {
//             fs.writeFile("./logs/warning.txt", warnMs, function (err) {
//                 if (err) {
//                     console.error(`an error occurred while writing a warning to the log file with this error ${err}`);
//                 }
//             })
//         },
//         error(e) {
//             fs.writeFile("./logs/error.txt", e, function (err) {
//                 if (err) {
//                     console.error(`an error occurred while writing a warning to the log file with this error ${err}`);
//                 }
//             })
//         }


// }
