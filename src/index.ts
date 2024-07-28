/**
 * @fileoverview Find and remove unused es6 modules
 * @author Mikkel Holmer Pedersen
 */
import noUnusedVars from "./rules/no-unused-vars";
import noUnusedImports from "./rules/no-unused-imports";
import { ESLint } from "eslint";

const plugin: ESLint.Plugin = {
    meta: {
        name: "unused-imports",
    },
    rules: {
        "no-unused-vars": noUnusedVars,
        "no-unused-imports": noUnusedImports,
    },
};

export default plugin;
