const { LEVEL, LEVEL_VALUES } = require("./util/constants");
const logFunction = require("./util/log");

//
//
// Constants
//

const DEFAULT_LOG_LEVEL = LEVEL.DEBUG;

//
//
// Helper Functions
//

/** Only log `messages` if `logLevel` is below `checkLevel` */
function log(messages, logLevel, checkLevel = DEFAULT_LOG_LEVEL) {
  if (LEVEL_VALUES[logLevel] <= LEVEL_VALUES[checkLevel]) {
    logFunction(messages);
  }
}

//
//
// Class Definition
//

class Logger {
  constructor({ level = process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL } = {}) {
    this.options = {
      level,
    };
  }

  //
  //
  // Log level functions
  //

  /* eslint-disable class-methods-use-this */
  debug(...messages) {
    log(messages, LEVEL.DEBUG, this.options.level);
  }

  error(...messages) {
    log(messages, LEVEL.ERROR, this.options.level);
  }

  fatal(...messages) {
    log(messages, LEVEL.FATAL, this.options.level);
  }

  info(...messages) {
    log(messages, LEVEL.INFO, this.options.level);
  }

  trace(...messages) {
    log(messages, LEVEL.TRACE, this.options.level);
  }

  warn(...messages) {
    log(messages, LEVEL.WARN, this.options.level);
  }
  /* eslint-enable class-methods-use-this */
}

//
//
// Export
//

module.exports = Logger;
