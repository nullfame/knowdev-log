const { COLOR, FORMAT, LEVEL, LEVEL_VALUES } = require("./util/constants");
const logFunction = require("./util/log");

//
//
// Constants
//

const DEFAULT_LOG_FORMAT = FORMAT.COLOR;
const DEFAULT_LOG_LEVEL = LEVEL.DEBUG;

const PSEUDO_LEVELS = ["ALL", "SILENT"];

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
  //
  //
  // Constructor
  //

  constructor({
    format = process.env.LOG_FORMAT || DEFAULT_LOG_FORMAT,
    level = process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL,
  } = {}) {
    // Set options
    this.options = {
      format,
      level,
    };

    // Build out the functions for each level
    const LEVEL_KEYS = Object.keys(LEVEL);
    LEVEL_KEYS.forEach((LEVEL_KEY) => {
      // Ignore the pseudo levels
      if (!PSEUDO_LEVELS.includes(LEVEL_KEY)) {
        switch (format) {
          case FORMAT.COLOR:
            this[LEVEL[LEVEL_KEY]] = (...messages) =>
              log(messages, LEVEL[LEVEL_KEY], level, {
                color: COLOR[LEVEL_KEY],
              });
            break;

          default:
            this[LEVEL[LEVEL_KEY]] = (...messages) =>
              log(messages, LEVEL[LEVEL_KEY], level, {
                color: COLOR.PLAIN,
              });
            break;
        }
      }
    });
  } // END constructor
}

//
//
// Export
//

module.exports = Logger;
