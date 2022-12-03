let winston = require("winston");

let	transports = [];
/**
 * Console transporter
 */
 transports.push(new winston.transports.Console({
	level: "debug",
	colorize: true,
	prettyPrint: true,
	handleExceptions: false
}));

let logger = winston.createLogger({
	level: "debug",
	transports: transports,
	exitOnError: false
});
module.exports = logger;
