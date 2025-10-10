export default {
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
import type { SomeType } from "./types";

/**
 * @see SomeType for more details
 */
const example = "test";
`,
        },
        {
            code: `
import type { Config } from "./config";

/**
 * @param {Config} config - The configuration object
 */
function setup(config: any) {}
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
        {
            code: `
import type { UnusedType } from "./unused";
import type { UsedInJSDoc } from "./used";

/**
 * Reference to {@link UsedInJSDoc}
 */
const example = "test";
`,
            errors: ["'UnusedType' is defined but never used."],
            output: `
import type { UsedInJSDoc } from "./used";

/**
 * Reference to {@link UsedInJSDoc}
 */
const example = "test";
`,
        },
    ],
};
