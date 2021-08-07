const Logger = require("../Logger");

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
});

//
//
// Run tests
//

describe("Logger", () => {
  it("Works", async () => {
    const log = new Logger();
    expect(log).toBeObject();
  });

  it("Is a class", () => {
    expect(Logger).toBeClass();
  });
});
