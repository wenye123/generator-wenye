"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-wenye:hello", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/hello"))
      .withPrompts({
        name: "wenye-hello",
        version: "1.0.0",
        description: "hello world",
        keywords: "hello,wenye",
        author: "wenye",
        license: "MIT"
      });
  });

  it("creates files", () => {
    assert.file(["hello.js"]);
    assert.file(["package.json"]);
    assert.file([".gitignore"]);
    assert.file(["util"]);
  });
});
