const Logger = require("../Logger");
const { LEVEL } = require("../util/constants");

//
//
// Mock constants
//

//
//
// Mock modules
//

const mockLog = jest.fn();
jest.mock("../util/log", () => () => {
  mockLog();
});

//
//
// Mock environment
//

let log;

const DEFAULT_ENV = process.env;
beforeEach(() => {
  process.env = { ...process.env };
  log = new Logger();
});
afterEach(() => {
  process.env = DEFAULT_ENV;
  jest.clearAllMocks();
});

//
//
// Run tests
//

describe("Logger", () => {
  it("Works", async () => {
    expect(log).toBeObject();
  });

  it("Is a class", () => {
    expect(Logger).toBeClass();
  });

  describe("Log Levels", () => {
    describe("Trace", () => {
      beforeEach(() => {
        log = new Logger({ level: LEVEL.TRACE });
      });

      it("Logs trace level", () => {
        log.trace("log.trace");
        expect(mockLog).toBeCalled();
      });
      it("Logs debug level", () => {
        log.debug("log.debug");
        expect(mockLog).toBeCalled();
      });
      it("Logs info level", () => {
        log.info("log.info");
        expect(mockLog).toBeCalled();
      });
      it("Logs warn level", () => {
        log.warn("log.warn");
        expect(mockLog).toBeCalled();
      });
      it("Logs error level", () => {
        log.error("log.error");
        expect(mockLog).toBeCalled();
      });
      it("Logs fatal level", () => {
        log.fatal("log.fatal");
        expect(mockLog).toBeCalled();
      });
    });
    describe("Debug", () => {
      beforeEach(() => {
        log = new Logger({ level: LEVEL.DEBUG });
      });

      it("Does not log trace level", () => {
        log.trace("log.trace");
        expect(mockLog).not.toBeCalled();
      });
      it("Logs debug level", () => {
        log.debug("log.debug");
        expect(mockLog).toBeCalled();
      });
      it("Logs info level", () => {
        log.info("log.info");
        expect(mockLog).toBeCalled();
      });
      it("Logs warn level", () => {
        log.warn("log.warn");
        expect(mockLog).toBeCalled();
      });
      it("Logs error level", () => {
        log.error("log.error");
        expect(mockLog).toBeCalled();
      });
      it("Logs fatal level", () => {
        log.fatal("log.fatal");
        expect(mockLog).toBeCalled();
      });
    });
    describe("Info", () => {
      beforeEach(() => {
        log = new Logger({ level: LEVEL.INFO });
      });

      it("Does not log trace level", () => {
        log.trace("log.trace");
        expect(mockLog).not.toBeCalled();
      });
      it("Does not log debug level", () => {
        log.debug("log.debug");
        expect(mockLog).not.toBeCalled();
      });
      it("Logs info level", () => {
        log.info("log.info");
        expect(mockLog).toBeCalled();
      });
      it("Logs warn level", () => {
        log.warn("log.warn");
        expect(mockLog).toBeCalled();
      });
      it("Logs error level", () => {
        log.error("log.error");
        expect(mockLog).toBeCalled();
      });
      it("Logs fatal level", () => {
        log.fatal("log.fatal");
        expect(mockLog).toBeCalled();
      });
    });
    describe("Warn", () => {
      beforeEach(() => {
        log = new Logger({ level: LEVEL.WARN });
      });

      it("Does not log trace level", () => {
        log.trace("log.trace");
        expect(mockLog).not.toBeCalled();
      });
      it("Does not log debug level", () => {
        log.debug("log.debug");
        expect(mockLog).not.toBeCalled();
      });
      it("Does not log info level", () => {
        log.info("log.info");
        expect(mockLog).not.toBeCalled();
      });
      it("Logs warn level", () => {
        log.warn("log.warn");
        expect(mockLog).toBeCalled();
      });
      it("Logs error level", () => {
        log.error("log.error");
        expect(mockLog).toBeCalled();
      });
      it("Logs fatal level", () => {
        log.fatal("log.fatal");
        expect(mockLog).toBeCalled();
      });
    });
    describe("Error", () => {
      beforeEach(() => {
        log = new Logger({ level: LEVEL.ERROR });
      });

      it("Does not log trace level", () => {
        log.trace("log.trace");
        expect(mockLog).not.toBeCalled();
      });
      it("Does not log debug level", () => {
        log.debug("log.debug");
        expect(mockLog).not.toBeCalled();
      });
      it("Does not log info level", () => {
        log.info("log.info");
        expect(mockLog).not.toBeCalled();
      });
      it("Does not log warn level", () => {
        log.warn("log.warn");
        expect(mockLog).not.toBeCalled();
      });
      it("Logs error level", () => {
        log.error("log.error");
        expect(mockLog).toBeCalled();
      });
      it("Logs fatal level", () => {
        log.fatal("log.fatal");
        expect(mockLog).toBeCalled();
      });
    });
    describe("Fatal", () => {
      beforeEach(() => {
        log = new Logger({ level: LEVEL.FATAL });
      });

      it("Does not log trace level", () => {
        log.trace("log.trace");
        expect(mockLog).not.toBeCalled();
      });
      it("Does not log debug level", () => {
        log.debug("log.debug");
        expect(mockLog).not.toBeCalled();
      });
      it("Does not log info level", () => {
        log.info("log.info");
        expect(mockLog).not.toBeCalled();
      });
      it("Does not log warn level", () => {
        log.warn("log.warn");
        expect(mockLog).not.toBeCalled();
      });
      it("Does not log error level", () => {
        log.error("log.error");
        expect(mockLog).not.toBeCalled();
      });
      it("Logs fatal level", () => {
        log.fatal("log.fatal");
        expect(mockLog).toBeCalled();
      });
    });
    describe("Silent", () => {
      beforeEach(() => {
        log = new Logger({ level: LEVEL.SILENT });
      });

      it("Does not log trace level", () => {
        log.trace("log.trace");
        expect(mockLog).not.toBeCalled();
      });
      it("Does not log debug level", () => {
        log.debug("log.debug");
        expect(mockLog).not.toBeCalled();
      });
      it("Does not log info level", () => {
        log.info("log.info");
        expect(mockLog).not.toBeCalled();
      });
      it("Does not log warn level", () => {
        log.warn("log.warn");
        expect(mockLog).not.toBeCalled();
      });
      it("Does not log error level", () => {
        log.error("log.error");
        expect(mockLog).not.toBeCalled();
      });
      it("Does not log fatal level", () => {
        log.fatal("log.fatal");
        expect(mockLog).not.toBeCalled();
      });
    });
  });
});
