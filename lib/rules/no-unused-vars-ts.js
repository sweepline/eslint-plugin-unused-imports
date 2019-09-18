/**
 * @fileoverview Filter imports from no-unused-vars.
 * @author Mikkel Holmer Pedersen <mikkel@holmerp.dk>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const tslint = require('@typescript-eslint/eslint-plugin');
const rule = tslint.rules['no-unused-vars'];

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
