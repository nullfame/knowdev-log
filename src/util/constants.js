const FORMAT = {
  COLOR: "color",
  JSON: "json",
  TEXT: "text",
};

const LEVEL = {
  ALL: "all",
  TRACE: "trace",
  DEBUG: "debug",
  INFO: "info",
  WARN: "warn",
  ERROR: "error",
  FATAL: "fatal",
  SILENT: "silent",
};

const LEVEL_VALUES = {
  all: 100,
  trace: 90,
  debug: 70,
  info: 50,
  warn: 30,
  error: 10,
  fatal: 1,
  none: 0,
  silent: 0,
};

module.exports = {
  FORMAT,
  LEVEL,
  LEVEL_VALUES,
};
