const stringify = require("./stringify");

//
//
// Main
//

const log = (messages) => {
  // eslint-disable-next-line no-console
  console.log(stringify(...messages));
};

//
//
// Export
//

module.exports = log;
