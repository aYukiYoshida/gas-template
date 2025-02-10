import functions from "../src/functions";

global.Logger = {
  log: jest.fn(),
  clear: jest.fn(),
  getLog: jest.fn(),
};

describe("functions", () => {
  describe("main", () => {
    it("Logging the message", () => {
      functions.main();
      expect(Logger.log).toHaveBeenCalledWith("Hello, World!");
    });
  });
});
