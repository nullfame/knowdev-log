require("dotenv").config();

const { envBoolean } = require("@knowdev/functions");

const { FORMAT, LEVEL } = require("./util/constants");
const Logger = require("./Logger");

//
//
// Normalize environment
//

process.env.MODULE_LOGGER = envBoolean("MODULE_LOGGER", {
  defaultValue: false,
});

//
//
// Instance
//

const log = new Logger();

//
//
// Decorate
//

log.log = log.debug;
log.LOG_FORMAT = FORMAT;
log.LOG_LEVEL = LEVEL;
log.Logger = Logger;
log.silent = new Logger({ level: LEVEL.SILENT });

//
//
// Sub-module logger
//

if (process.env.MODULE_LOGGER) {
  if (process.env.MODULE_LOG_LEVEL) {
    log.moduleLogger = new Logger({ level: process.env.MODULE_LOG_LEVEL });
  } else {
    log.moduleLogger = new Logger({ level: process.env.LOG_LEVEL });
  }
} else {
  log.moduleLogger = new Logger({ level: LEVEL.SILENT });
}

//
//
// Export
//

module.exports = log;
