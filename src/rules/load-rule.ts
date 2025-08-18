import { Rule } from "eslint";
import { createRequire } from "module";

let rule: Rule.RuleModule | undefined;

const require = createRequire(import.meta.url);

export function getBaseRule(): Rule.RuleModule {
    if (!rule) {
        rule = getRuleFromTSLintPlugin() ?? getRuleFromTSLint() ?? getESLintBaseRule();
    }
    return rule!;
}

export function getRuleFromTSLintPlugin() {
    try {
        const tslintPlugin = require("@typescript-eslint/eslint-plugin");
        return tslintPlugin.rules["no-unused-vars"];
    } catch (_) {
        return null;
    }
}

export function getRuleFromTSLint() {
    try {
        const tslint = require("typescript-eslint");
        return tslint.plugin.rules["no-unused-vars"];
    } catch (_) {
        return null;
    }
}

export function getESLintBaseRule() {
    const eslint = require("eslint");
    return new eslint.Linter({ configType: "eslintrc" }).getRules().get("no-unused-vars");
}
