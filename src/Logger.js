const { force } = require("@knowdev/arguments");

const {
  COLOR,
  ERROR,
  FORMAT,
  LEVEL,
  LEVEL_VALUES,
} = require("./util/constants");
const logFunction = require("./util/log");
const stringify = require("./util/stringify");

//
//
// Constants
//

const DEFAULT_LOG_FORMAT = FORMAT.COLOR;
const DEFAULT_LOG_LEVEL = LEVEL.DEBUG;
const DEFAULT_LOG_VAR_LEVEL = LEVEL.DEBUG;

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
  { color = COLOR.PLAIN } = {},
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
    tags = {},
    varLevel = process.env.LOG_VAR_LEVEL || DEFAULT_LOG_VAR_LEVEL,
  } = {}) {
    //
    //
    // Validate
    //

    //
    //
    // Setup
    //

    // Set options
    this.options = {
      format,
      level,
      varLevel,
    };

    // Set tags
    this.tags = {};
    // Force the value of all the keys in this.tags to be strings
    Object.keys(tags).forEach((key) => {
      this.tags[key] = force.string(tags[key]);
    });

    //
    //
    // Preprocess
    //

    //

    //
    //
    // Process
    //

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

          case FORMAT.JSON:
            this[LEVEL[LEVEL_KEY]] = (...messages) => {
              const json = {
                // data: flatOne(...messages) // will not be stringified; absent if message is string
                level: LEVEL[LEVEL_KEY],
                message: stringify(...messages), // message: will be stringified
                ...this.tags,
              };
              log(json, LEVEL[LEVEL_KEY], level, {
                color: COLOR[LEVEL_KEY],
              });
            };
            break;

          default:
            this[LEVEL[LEVEL_KEY]] = (...messages) =>
              log(messages, LEVEL[LEVEL_KEY], level, {
                color: COLOR.PLAIN,
              });
            break;
        } // switch format

        // Build var function
        this[LEVEL[LEVEL_KEY]].var = (messageObject, messageValue) => {
          // Log undefined warning
          if (messageObject === undefined) {
            this.warn(ERROR.VAR.UNDEFINED_MESSAGE);
          }

          // If passing two params
          if (typeof messageObject !== "object") {
            /* eslint-disable no-param-reassign */
            if (messageValue === undefined) messageValue = "undefined";
            messageObject = { [messageObject]: messageValue };
            /* eslint-enable no-param-reassign */
          }

          //* At this point we know this is an object or null

          // Log null object warning
          if (messageObject === null) {
            this.warn(ERROR.VAR.NULL_OBJECT);

            // Log empty object warning
          } else if (Object.keys(messageObject).length === 0) {
            this.warn(ERROR.VAR.EMPTY_OBJECT);
          } else if (Object.keys(messageObject).length > 1) {
            this.warn(ERROR.VAR.MULTIPLE_KEYS);
          }

          // Log the real message
          return this[LEVEL[LEVEL_KEY]](messageObject);
        };
      } // if !PSEUDO_LEVELS
    }); // forEach LEVEL_KEYS

    //
    //
    // Postprocess
    //

    // Link var convenience function
    this.var = this[this.options.varLevel].var;

    //
    //
    // Return
    //

    // * We could expressly return `this` but it is implicit in JS
  } // END constructor
}

//
//
// Export
//

module.exports = Logger;
