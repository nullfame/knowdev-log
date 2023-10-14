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
jest.mock("../util/log", () => (...params) => {
  mockLog(...params);
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
      expect(mockLog).toBeCalled();
    });
    it("Logs JSON", () => {
      log.trace("log.trace");
      expect(mockLog).toBeCalled();
      const logObject = mockLog.mock.calls[0][0];
      expect(logObject).toBeObject();
    });
    it("Includes message and level keys", () => {
      log.trace("log.trace");
      expect(mockLog).toBeCalled();
      const logObject = mockLog.mock.calls[0][0];
      expect(logObject).toContainKey("message");
      expect(logObject).toContainKey("level");
    });
  });
  it.todo("Allows tagging a single message");
});
