const { COLOR, FORMAT, LEVEL, LEVEL_VALUES } = require("./util/constants");
const logFunction = require("./util/log");

//
//
// Constants
//

const DEFAULT_LOG_FORMAT = FORMAT.COLOR;
const DEFAULT_LOG_LEVEL = LEVEL.DEBUG;

//
//
// Helper Functions
//

/** Only log `messages` if `logLevel` is below `checkLevel` */
function log(
  messages,
  logLevel,
  checkLevel = DEFAULT_LOG_LEVEL,
  { color = COLOR.PLAIN } = {}
) {
  if (LEVEL_VALUES[logLevel] <= LEVEL_VALUES[checkLevel]) {
    logFunction(messages, color);
  }
}

//
//
// Class Definition
//

class Logger {
  constructor({
    format = process.env.LOG_FORMAT || DEFAULT_LOG_FORMAT,
    level = process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL,
  } = {}) {
    this.options = {
      format,
      level,
    };
  }

  //
  //
  // Log level functions
  //

  /* eslint-disable class-methods-use-this */
  debug(...messages) {
    const color =
      this.options.format === FORMAT.COLOR ? COLOR.DEBUG : COLOR.PLAIN;
    log(messages, LEVEL.DEBUG, this.options.level, { color });
  }

  error(...messages) {
    const color =
      this.options.format === FORMAT.COLOR ? COLOR.ERROR : COLOR.PLAIN;
    log(messages, LEVEL.ERROR, this.options.level, { color });
  }

  fatal(...messages) {
    const color =
      this.options.format === FORMAT.COLOR ? COLOR.FATAL : COLOR.PLAIN;
    log(messages, LEVEL.FATAL, this.options.level, { color });
  }

  info(...messages) {
    const color =
      this.options.format === FORMAT.COLOR ? COLOR.INFO : COLOR.PLAIN;
    log(messages, LEVEL.INFO, this.options.level, { color });
  }

  trace(...messages) {
    const color =
      this.options.format === FORMAT.COLOR ? COLOR.TRACE : COLOR.PLAIN;
    log(messages, LEVEL.TRACE, this.options.level, { color });
  }

  warn(...messages) {
    const color =
      this.options.format === FORMAT.COLOR ? COLOR.WARN : COLOR.PLAIN;
    log(messages, LEVEL.WARN, this.options.level, { color });
  }
  /* eslint-enable class-methods-use-this */
}

//
//
// Export
//

module.exports = Logger;
