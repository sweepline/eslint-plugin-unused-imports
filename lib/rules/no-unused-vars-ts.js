/**
 * @fileoverview Filter imports from no-unused-vars.
 * @author Mikkel Holmer Pedersen <mikkel@holmerp.dk>
 */
"use strict";

const { unusedVarsPredicate } = require("./predicates");

const ruleComposer = require("eslint-rule-composer");
const tslint = require("@typescript-eslint/eslint-plugin");
const rule = tslint.rules["no-unused-vars"];

rule.meta.fixable = "code";

module.exports = ruleComposer.filterReports(rule, unusedVarsPredicate);
