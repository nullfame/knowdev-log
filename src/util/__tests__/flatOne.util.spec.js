const flatOne = require("../flatOne.util");

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

describe("FlatOne util", () => {
  it("Is a function", () => {
    expect(flatOne).toBeFunction();
  });
});
