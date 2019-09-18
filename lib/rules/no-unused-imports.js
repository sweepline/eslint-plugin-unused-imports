/**
 * @fileoverview Add fixer to imports in no-unused-vars.
 * @author Mikkel Holmer Pedersen <mikkel@holmerp.dk>
 */
"use strict";

const ruleComposer = require("eslint-rule-composer");
const eslint = require("eslint");
const rule = new eslint.Linter().getRules().get("no-unused-vars");

rule.meta.recommended = true;
rule.meta.fixable = "code";

const commaFilter = { filter: token => token.value === "," };

module.exports = ruleComposer.filterReports(rule, (problem, context) => {
	const { sourceCode } = context;

	const { node } = problem;
	const { parent } = node;

	// Only handle these 3 cases.
	switch (parent.type) {
		case "ImportSpecifier":
		case "ImportDefaultSpecifier":
		case "ImportNamespaceSpecifier":
			break;
		default:
			return false;
	}

	problem.fix = fixer => {
		if (!parent) {
			return null;
		}
		const grandParent = parent.parent;

		if (!grandParent) {
			return null;
		}

		// Only one import
		if (grandParent.specifiers.length === 1) {
			return fixer.remove(grandParent);
		}

		// Not last specifier
		if (parent !== grandParent.specifiers[grandParent.specifiers.length - 1]) {
			const comma = sourceCode.getTokenAfter(parent, commaFilter);

			return [fixer.remove(parent), fixer.remove(comma)];
		}

		// Default export and a single normal left, ex. "import default, { package1 } from 'module';"
		if (
			grandParent.specifiers.filter(specifier => specifier.type === "ImportSpecifier").length === 1
		) {
			const start = sourceCode.getTokenBefore(parent, commaFilter),
				end = sourceCode.getTokenAfter(parent, { filter: token => token.value === "}" });

			return fixer.removeRange([start.range[0], end.range[1]]);
		}

		return fixer.removeRange([
			sourceCode.getTokenBefore(parent, commaFilter).range[0],
			parent.range[1]
		]);
	};
	return problem;
});
