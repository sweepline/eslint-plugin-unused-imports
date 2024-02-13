RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
    parserOptions: { ecmaVersion: 2015, sourceType: "module" },
});

const cases = require("./cases");

global.eslintUnusedImportsForceLoadJSLint = "true";
let rule;
jest.isolateModules(() => {
    rule = require("../rules/no-unused-imports");
});
ruleTester.run("no-unused-imports", rule, cases);
