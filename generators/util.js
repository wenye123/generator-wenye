const fs = require("fs");

/** 获取git远程地址 */
function getGitOrigin(gitConfigFile) {
  try {
    const gitConfig = fs.readFileSync(gitConfigFile, "utf8");
    const m = gitConfig.match(/\s+url\s+=\s+(\S+)\s+/i);
    if (m) {
      return m[1].replace(/https?:\/\//, "").replace(/:/g, "/");
    }
  } catch (_err) {
    return;
  }
}

/** 合成package.json */
exports.genPackage = (base, addtion) => {
  const pkg = {
    name: addtion.name,
    version: addtion.version,
    description: addtion.description,
    keywords: addtion.keywords,
    author: addtion.author,
    license: addtion.license
  };
  Object.assign(pkg, base);
  if (addtion.repo) {
    pkg.repository = {
      type: "git",
      url: `git+https://${addtion.repo}.git`
    };
    pkg.bugs = {
      url: `https://${addtion.repo}/issues`
    };
    pkg.homepage = `https://${addtion.repo}#readme`;
  }
  return pkg;
};

/** 常用的提示 */
exports.commonPrompts = function commonPrompts() {
  const repo = getGitOrigin(this.destinationPath("./.git/config"));
  return [
    {
      name: "name",
      message: "package name:",
      default: this.appname && this.appname.replace(/\s/g, "-"),
      validate: input => {
        return !!input.match(
          "^(?:@[a-z0-9-~][a-z0-9-._~]*/)?[a-z0-9-~][a-z0-9-._~]*$"
        );
      }
    },
    {
      name: "version",
      message: "version:",
      default: "1.0.0",
      validate: input => {
        return !!input.match(/\d+\.\d+\.\d+/);
      }
    },
    {
      type: "input",
      name: "description",
      message: "description:"
    },
    {
      name: "author",
      default: `${this.user.git.name()} <${this.user.git.email()}>`,
      message: "author"
    },
    {
      name: "repo",
      default: repo,
      message: "git repository:",
      filter: repo => {
        return repo
          .replace(/https?:\/\//, "")
          .replace(/^(.*?)@/, "")
          .replace(/.git$/, "");
      }
    },
    {
      name: "keywords",
      message: "keywords:",
      filter: words => {
        return words ? words.split(/\s+|,/g) : [""];
      }
    },
    {
      type: "list",
      name: "license",
      default: "ISC",
      message: "license:",
      choices: ["ISC", "MIT", "Apache-2.0", "AGPL-3.0"]
    }
  ];
};
