"use strict";

let logger    = require("../..server/utils/logger.js");
let moment    = require("moment");
let mongoose  = require("../core/mongoose");

let gracefulExit = function() {
	if (mongoose.connection.readyState === 0) {
		return process.exit(0);
	}
	mongoose.connection.close(function() {
		return agenda.stop(function() {
			logger.info("[ Server stopped at %s Uptime: %s ]", moment().format("YYYY-MM-DD HH:mm:ss.SSS"), moment.duration(process.uptime() * 1000).humanize());
			return process.exit(0);
		});
	});
};

process.on("SIGINT", gracefulExit).on("SIGTERM", gracefulExit);
