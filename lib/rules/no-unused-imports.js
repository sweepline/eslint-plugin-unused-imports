/**
 * @fileoverview Add fixer to imports in no-unused-vars.
 * @author Mikkel Holmer Pedersen <mikkel@holmerp.dk>
 */
"use strict";

const { unusedImportsPredicate } = require("./predicates");

const ruleComposer = require("eslint-rule-composer");

const rule = require("./load-rule");
rule.meta.fixable = "code";
rule.meta.docs.url =
    "https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md";
rule.meta.docs.extendsBaseRule = false;

module.exports = ruleComposer.filterReports(rule, unusedImportsPredicate);
