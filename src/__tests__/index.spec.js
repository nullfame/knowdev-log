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
});
