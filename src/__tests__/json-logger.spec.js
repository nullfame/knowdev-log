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
  it("Works", async () => {
    expect(log).toBeObject();
    log.trace("log.trace");
    expect(mockLog).toBeCalled();
  });
});
