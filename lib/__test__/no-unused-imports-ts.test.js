RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
        ecmaVersion: 2015,
        sourceType: "module",
    },
});

const cases = require("./cases");

global.eslintUnusedImportsForceLoadJSLint = "false";
let rule;
jest.isolateModules(() => {
    rule = require("../rules/no-unused-imports");
});
ruleTester.run("no-unused-imports-js", rule, cases);
ruleTester.run("no-unused-imports-ts", rule, {
    valid: [
        {
            code: `
import x from "package";
import { a, b } from "./utils";
import y from "package";
import TType from "Package";

const c: TType = a() + b + x() + y();
`,
        },
    ],

    invalid: [
        {
            code: `
import x from "package";
import { a, b } from "./utils";
import y from "package";
import TType from "Package";

const c = a() + b + x() + y();
`,
            errors: ["'TType' is defined but never used."],
            output: `
import x from "package";
import { a, b } from "./utils";
import y from "package";

const c = a() + b + x() + y();
`,
        },
    ],
});
