const Generator = require("yeoman-generator");
const pkg = require("../package.json");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  help() {
    this.log(`${pkg.name}@${pkg.version}\n`);
    this.log("使用 `yo wenye:hello` hello world\n");
    this.log("使用 `yo wenye:lib` 初始化工具库\n");
    return "----使用说明----";
  }
};
