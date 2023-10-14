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
    it("Allows removing global tags", () => {
      // Arrange
      log = new Logger({
        format: FORMAT.JSON,
        level: LEVEL.TRACE,
        tags: { key: "value" },
      });
      // Act
      log.untag("key");
      log.trace("log.trace");
      // Assert
      const logObject = mockLog.mock.calls[0][0];
      expect(logObject).not.toContainKey("key");
    });
    it("Allows removing tags by array", () => {
      // Arrange
      log = new Logger({
        format: FORMAT.JSON,
        level: LEVEL.TRACE,
        tags: { key: "value", hello: "world" },
      });
      // Act
      log.untag(["key", "hello"]);
      log.trace("log.trace");
      // Assert
      const logObject = mockLog.mock.calls[0][0];
      expect(logObject).not.toContainKey("key");
      expect(logObject).not.toContainKey("hello");
    });
    it("Allows tagging a single message (key:value)", () => {
      // Arrange
      log = new Logger({
        format: FORMAT.JSON,
        level: LEVEL.TRACE,
      });
      // Act
      log.with("key", "value").trace("log.trace");
      // Assert
      const logObject = mockLog.mock.calls[0][0];
      expect(logObject).toContainKey("key");
      expect(logObject.key).toBe("value");
    });
    it("Allows tagging a single message (object)", () => {
      // Arrange
      log = new Logger({
        format: FORMAT.JSON,
        level: LEVEL.TRACE,
      });
      // Act
      log.with({ hello: "world", key: ["value"] }).trace("log.trace");
      // Assert
      const logObject = mockLog.mock.calls[0][0];
      expect(logObject).toContainKey("hello");
      expect(logObject).toContainKey("key");
      expect(logObject.hello).toBe("world");
      expect(logObject.key).toBe(`["value"]`);
    });
    it("Does not tag the second message after with()", () => {
      // Arrange
      log = new Logger({
        format: FORMAT.JSON,
        level: LEVEL.TRACE,
        tags: { hello: "world" },
      });
      // Act
      log.with("key", "value").info("log.info");
      log.trace("log.trace");
      // Assert
      const taggedLogObject = mockLog.mock.calls[0][0];
      expect(taggedLogObject).toContainKey("hello");
      expect(taggedLogObject).toContainKey("key");
      expect(taggedLogObject.hello).toBe("world");
      expect(taggedLogObject.key).toBe("value");
      const untaggedLogObject = mockLog.mock.calls[1][0];
      expect(untaggedLogObject).toContainKey("hello");
      expect(taggedLogObject.hello).toBe("world");
      expect(untaggedLogObject).not.toContainKey("key");
    });
  });
});
