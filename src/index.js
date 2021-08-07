const { LEVEL } = require("./util/constants");
const Logger = require("./Logger");

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
log.LOG_LEVEL = LEVEL;
log.Logger = Logger;

//
//
// Export
//

module.exports = log;
