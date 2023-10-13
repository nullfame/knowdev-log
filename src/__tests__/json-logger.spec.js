const Logger = require("../Logger");
const { LEVEL, FORMAT } = require("../util/constants");

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
  log = new Logger({ format: FORMAT.JSON, level: LEVEL.TRACE });
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
  describe("JSON Format", () => {
    it("Works", async () => {
      expect(log).toBeObject();
      expect(log.trace).toBeFunction();
      log.trace("log.trace");
      // expect(mockLog).toBeCalled();
    });

    describe("Winston", () => {
      it.todo("Instantiates Winston");
      it.todo(
        "Uses project custom log levels (trace, debug, info, warn, error, fatal)",
      );
    });
  });
  describe("Default Format", () => {
    it.todo("Does not instantiate Winston");
  });
});
