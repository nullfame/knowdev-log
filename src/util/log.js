const { COLOR } = require("./constants");
const stringify = require("./stringify");

//
//
// Main
//

const log = (messages, color = COLOR.PLAIN) => {
  // eslint-disable-next-line no-console
  console.log(color(stringify(...messages)));
};

//
//
// Export
//

module.exports = log;
