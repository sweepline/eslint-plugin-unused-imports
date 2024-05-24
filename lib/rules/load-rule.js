let rule;
try {
    if (global.eslintUnusedImportsForceLoadJSLint === "true") {
        throw new Error("FAIL");
    }
    const tslint = require("@typescript-eslint/eslint-plugin");
    rule = tslint.rules["no-unused-vars"];
} catch (_) {
    const eslint = require("eslint");
    rule = new eslint.Linter({ configType: "eslintrc" }).getRules().get("no-unused-vars");
}
module.exports = rule;
