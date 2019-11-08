"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-wenye:lib", () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, "../generators/lib")).withPrompts({
      name: "wenye-hello",
      version: "1.0.0",
      description: "hello world",
      keywords: "hello,wenye",
      author: "wenye",
      license: "MIT"
    });
  });

  it("creates files", () => {
    assert.file(["README.md"]);
    assert.file(["tsconfig.json"]);
    assert.file([".gitignore"]);
    assert.file([".editorconfig"]);
    assert.file([".prettierrc.js"]);
    assert.file([".travis.yml"]);
    assert.file(["src"]);
    assert.file(["test"]);
  });
});
