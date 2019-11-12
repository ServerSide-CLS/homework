const sassMiddleware = require("node-sass-middleware");
const path = require("path");
const destDir = path.resolve(__dirname, "../../public/stylesheets");
const srcDir = path.resolve(__dirname, "../../public/sass");

module.exports.sass = () => {
  return sassMiddleware({
    src: srcDir,
    dest: destDir,
    indentedSyntax: false,
    response: false,
    sourceMap: true
  });
};
