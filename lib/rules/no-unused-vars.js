/**
 * @fileoverview Filter imports from no-unused-vars.
 * @author Mikkel Holmer Pedersen <mikkel@holmerp.dk>
 */
"use strict";

const { unusedVarsPredicate } = require("./predicates");

const ruleComposer = require("eslint-rule-composer");
const eslint = require("eslint");
const rule = new eslint.Linter().getRules().get("no-unused-vars");

rule.meta.fixable = "code";

module.exports = ruleComposer.filterReports(rule, unusedVarsPredicate);
