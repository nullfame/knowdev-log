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

log.Logger = Logger;

//
//
// Export
//

module.exports = log;
