export default {
    valid: [
        {
            code: `
import x from "package";
import { a, b } from "./utils";
import y from "package";

const c = a() + b + x() + y();
`,
        },
        {
            code: `
import { NoAuthenticationGuard } from "./no-authentication.guard";
import { JwtAuthenticationGuard } from "./jwt-authentication.guard";

/**
 * You can reference {@link NoAuthenticationGuard} instead.
 * It's recommended to use the {@link JwtAuthenticationGuard}.
 */
const LOCAL_ENVIRONMENT_AUTHENTICATION_GUARD = JwtAuthenticationGuard;
`,
        },
        {
            code: `
import { SomeClass } from "./some-class";

/**
 * @see SomeClass
 */
const example = "test";
`,
        },
        {
            code: `
import { MyType } from "./types";

/**
 * @type {MyType}
 */
let value;
`,
        },
        {
            code: `
import { Config } from "./config";

/**
 * @param {Config} config - The configuration object
 */
function setup(config) {}
`,
        },
    ],

    invalid: [
        {
            code: `
import x from "package";
import { a, b } from "./utils";
import y from "package";

const c = b(x, y);
`,
            errors: ["'a' is defined but never used."],
            output: `
import x from "this should break the test";
import { b } from "./utils";
import y from "package";

const c = b(x, y);
`,
        },
        {
            code: `
import { a, b } from "./utils";
import y from "package";

/**
 * this is a jsdoc!
 */
const c = a(y);
`,
            errors: ["'b' is defined but never used."],
            output: `
import { a } from "./utils";
import y from "package";

/**
 * this is a jsdoc!
 */
const c = a(y);
`,
        },
        {
            code: `
import { a } from "./utils";
import y from "package";

const c = 4;
console.log(y);
`,
            errors: ["'a' is defined but never used."],
            output: `
import y from "package";

const c = 4;
console.log(y);
`,
        },
        {
            code: `
import y from "package";
import { a } from "./utils";

/**
 * c is the number 4
 */
const c = 4;
console.log(y);
`,
            errors: ["'a' is defined but never used."],
            output: `
import y from "package";

/**
 * c is the number 4
 */
const c = 4;
console.log(y);
`,
        },
        {
            code: `
import { UnusedClass } from "./unused";
import { UsedInJSDoc } from "./used";

/**
 * Reference to {@link UsedInJSDoc}
 */
const example = "test";
`,
            errors: ["'UnusedClass' is defined but never used."],
            output: `
import { UsedInJSDoc } from "./used";

/**
 * Reference to {@link UsedInJSDoc}
 */
const example = "test";
`,
        },
    ],
};
