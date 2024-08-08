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
};
