/* eslint-disable no-console */

const out = require("../out");

//
//
// Mock constants
//

//

//
//
// Mock modules
//

beforeAll(() => {
  jest.spyOn(console, "debug");
  jest.spyOn(console, "info");
  jest.spyOn(console, "warn");
  jest.spyOn(console, "error");
});

//
//
// Mock environment
//

const DEFAULT_ENV = process.env;
beforeEach(() => {
  process.env = { ...process.env };
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
  describe("out function", () => {
    it("Works", () => {
      expect(out).toBeFunction();
      out("Hi.");
    });
    it("Logs debug by default to console.debug", () => {
      out("Hi.");
      expect(console.debug).toBeCalled();
      expect(console.debug).toBeCalledTimes(1);
      expect(console.info).not.toBeCalled();
      expect(console.warn).not.toBeCalled();
      expect(console.error).not.toBeCalled();
    });
  });
  describe("Log levels", () => {
    it.todo("Calls console.debug for trace");
    it.todo("Calls console.debug for debug");
    it.todo("Calls console.info for info");
    it.todo("Calls console.warn for warn");
    it.todo("Calls console.error for error");
    it.todo("Calls console.error for fatal");
  });
});
