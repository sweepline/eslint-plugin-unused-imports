/**
 * @fileoverview Filter imports from no-unused-vars.
 * @author Mikkel Holmer Pedersen <mikkel@holmerp.dk>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const eslint = require("eslint");
const rule = new eslint.Linter().getRules().get("no-unused-vars");

rule.meta.recommended = true;
rule.meta.fixable = "code";

module.exports = ruleComposer.filterReports(rule, (problem, context) => {
	const { node } = problem;
	const { parent } = node;

	// Remove these 3 cases, pass any other trough.
	switch (parent.type) {
		case "ImportSpecifier":
		case "ImportDefaultSpecifier":
		case "ImportNamespaceSpecifier":
			return false;
		default:
			return problem;
	}
});
