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
  describe("Data field", () => {
    it.todo("Is available when log.var() is called");
    it.todo("Is available when an object is given to the message");
    it.todo("Future: is available when a JSON string is given to the message");
    it.todo("Future: it tries to recursively parse JSON strings");
    it.todo("Future: is available when log.data() is called");
    it.todo("Future: is available when log.val() is called");
  });
  describe("Tags", () => {
    it("Allows setting global tags in the constructor", () => {
      // Arrange
      log = new Logger({
        format: FORMAT.JSON,
        level: LEVEL.TRACE,
        tags: { key: "value" },
      });
      // Act
      log.trace("log.trace");
      // Assert
      const logObject = mockLog.mock.calls[0][0];
      expect(logObject).toContainKey("key");
      expect(logObject.key).toBe("value");
      // Done
    });
    it("Allows setting global tags in the constructor (will force string)", () => {
      // Arrange
      log = new Logger({
        format: FORMAT.JSON,
        level: LEVEL.TRACE,
        tags: { key: ["value"] },
      });
      // Act
      log.trace("log.trace");
      // Assert
      const logObject = mockLog.mock.calls[0][0];
      expect(logObject).toContainKey("key");
      expect(logObject.key).toBe(`["value"]`);
      // Done
    });
    it("Allows setting global tags in the constructor (when passed null)", () => {
      // Arrange
      log = new Logger({
        format: FORMAT.JSON,
        level: LEVEL.TRACE,
        tags: { key: null },
      });
      // Act
      log.trace("log.trace");
      // Assert
      const logObject = mockLog.mock.calls[0][0];
      expect(logObject).toContainKey("key");
      expect(logObject.key).toBe("null");
      // Done
    });
    it("Allows setting global tags individually", () => {
      // Arrange
      log = new Logger({
        format: FORMAT.JSON,
        level: LEVEL.TRACE,
      });
      // Act
      log.tag("key", "value");
      log.trace("log.trace");
      // Assert
      const logObject = mockLog.mock.calls[0][0];
      expect(logObject).toContainKey("key");
      expect(logObject.key).toBe("value");
    });
    it("Allows setting global tags with an object", () => {
      // Arrange
      log = new Logger({
        format: FORMAT.JSON,
        level: LEVEL.TRACE,
      });
      // Act
      log.tag({ hello: "world", key: "value" });
      log.trace("log.trace");
      // Assert
      const logObject = mockLog.mock.calls[0][0];
      expect(logObject).toContainKey("hello");
      expect(logObject).toContainKey("key");
      expect(logObject.hello).toBe("world");
      expect(logObject.key).toBe("value");
    });
    it("Allows setting global tags with an object (will force string)", () => {
      // Arrange
      log = new Logger({
        format: FORMAT.JSON,
        level: LEVEL.TRACE,
      });
      // Act
      log.tag({ hello: "world", key: ["value"] });
      log.trace("log.trace");
      // Assert
      const logObject = mockLog.mock.calls[0][0];
      expect(logObject).toContainKey("hello");
      expect(logObject).toContainKey("key");
      expect(logObject.hello).toBe("world");
      expect(logObject.key).toBe(`["value"]`);
    });
    it("Responds rationally if key doesn't have a value", () => {
      // Arrange
      log = new Logger({
        format: FORMAT.JSON,
        level: LEVEL.TRACE,
      });
      // Act
      log.tag({ key: undefined });
      log.trace("log.trace");
      // Assert
      const logObject = mockLog.mock.calls[0][0];
      expect(logObject).toContainKey("key");
      expect(logObject.key).toBe(``);
    });
    it.todo("Allows removing global tags");
    it.todo("Allows tagging a single message");
  });
});
