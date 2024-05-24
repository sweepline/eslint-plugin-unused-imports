/**
 * @fileoverview Find and remove unused es6 modules
 * @author Mikkel Holmer Pedersen
 */
"use strict";

const noUnusedVars = require("./rules/no-unused-vars");
const noUnusedImports = require("./rules/no-unused-imports");

const plugin = {
    meta: {},
    configs: {},
    rules: {
        "no-unused-vars": noUnusedVars,
        "no-unused-imports": noUnusedImports,
    },
    processors: {},
};

// import all rules in lib/rules
module.exports = plugin;
