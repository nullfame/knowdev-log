# KnowDev Log 🔊

## 📋 Usage

### Installation

``` bash
npm install --save @knowdev/log
```

### Environment Variables

``` bash
LOG_LEVEL=all|trace|*debug*|info|warn|error|fatal|silent
```

### Log by Levels

``` javascript
const log = require("@knowdev/log");

log.trace();
log.debug();
log.info();
log.warn();
log.error();
log.fatal();
```

### Logger Class

``` javascript
const { Logger, LOG_LEVEL } = require("@knowdev/log");

const log = new Logger({
  level: LOG_LEVEL.TRACE
})
```

### Conveniences

#### Log Function, Stand-alone (debug)

``` javascript
const { log } = require("@knowdev/log");

log(message);
```

#### Module Logger

Uses `silent` by default.  if `process.env.MODULE_LOG_LEVEL` is `true`, follows `process.env.LOG_LEVEL`.  If `process.env.MODULE_LOG_LEVEL` is also set, uses that log level.

``` javascript
const { moduleLogger } = require("@knowdev/log");

moduleLogger.trace();
```

#### Silent Log

Useful to support logging in code but only if an instantiated log object is passed in.

``` javascript
const { silent } = require("@knowdev/log");

silent.fatal(); // Doesn't log
```

## 🚀 Deployment

``` bash
npm publish --access=public
```

## 📝 Changelog

* v1.0.0 - Supports JSON type
* v0.4.0 - Exports moduleLogger
* v0.3.0 - Checks `.env` for settings
* v0.2.1 - Chained Logger.info.var(), etc functions
* v0.2.0 - Logger.var(), colors
* v0.1.0 - Basic log levels, silent

## 🛣 Roadmap

* TBD

### Wishlist 🌠

* Level: Success, Nonsuccess
* Format
  * Text: show tags, etc
  * ...Table
* Meta
  * Flag
  * Function
  * Level
  * Library (lib)
  * Note
  * Variable (var)
* Observing/OpenTracing
  * log.span.start/stop
  * log.function.enter/return/throw/exit (trace)

## 📜 License

All rights reserved. Safe for use around pets.
