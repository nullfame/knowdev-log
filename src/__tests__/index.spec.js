const log = require("../index");

//
//
// Mock constants
//

//
//
// Mock modules
//

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
  jest.resetModules();
});

//
//
// Run tests
//

describe("Index", () => {
  it("Is an instance", async () => {
    expect(log).toBeObject();
  });

  it("Includes the full class", async () => {
    expect(log.Logger).toBeClass();
  });

  it("Includes a log function", async () => {
    expect(log.log).toBeFunction();
  });

  it("Includes a silent instance", async () => {
    expect(log.silent).toBeObject();
  });

  it("Includes LOG_LEVEL", async () => {
    expect(log.LOG_LEVEL).toBeObject();
    expect(log.LOG_LEVEL.ALL).toBeString();
    expect(log.LOG_LEVEL.TRACE).toBeString();
    expect(log.LOG_LEVEL.DEBUG).toBeString();
    expect(log.LOG_LEVEL.INFO).toBeString();
    expect(log.LOG_LEVEL.WARN).toBeString();
    expect(log.LOG_LEVEL.ERROR).toBeString();
    expect(log.LOG_LEVEL.FATAL).toBeString();
    expect(log.LOG_LEVEL.SILENT).toBeString();
  });

  it("Sets MODULE_LOGGER `false` by default", () => {
    // eslint-disable-next-line global-require
    require("../index");
    expect(process.env.MODULE_LOGGER).toBeFalse();
  });
  it("Allows MODULE_LOGGER to be `true`", () => {
    process.env.MODULE_LOGGER = "true";
    // eslint-disable-next-line global-require
    require("../index");
    expect(process.env.MODULE_LOGGER).toBeTrue();
  });
});
