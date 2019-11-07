"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const { genPackage, commonPrompts } = require("../util");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.isExits = false;
    this.props = {};
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the exceptional ${chalk.red("generator-wenye")} generator!`
      )
    );
    // 判断是否需要更新
    this.isExits = this.fs.exists(this.destinationPath("package.json"));
    if (this.isExits) {
      return this.prompt({
        type: "confirm",
        name: "update",
        message: "update project ?",
        default: true
      }).then(prop => {
        if (!prop.update) return process.exit();
      });
    }
    // 其他提示
    const prompts = [...commonPrompts.call(this)];
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    // 不存在才更新package.json
    if (!this.isExits) {
      const packageInfo = this.fs.readJSON(this.templatePath("package.json"));
      this.fs.extendJSON(
        this.destinationPath("package.json"),
        genPackage(packageInfo, this.props)
      );
    }
    // 复制文件
    [
      "README.md",
      "tsconfig.json",
      ".gitignore",
      ".editorconfig",
      ".prettierrc.js"
    ].forEach(v => {
      this.fs.copy(this.templatePath(v), this.destinationPath(v));
    });
    // 复制目录
    ["src", "test"].forEach(v => {
      this.fs.copy(this.templatePath(v), this.destinationPath(v));
    });
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false
    });
  }
};
