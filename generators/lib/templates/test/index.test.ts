import { getStr } from "../src/index";

describe("test", function() {
  test("hello", function() {
    expect(getStr()).toBe("hello");
  });
});
