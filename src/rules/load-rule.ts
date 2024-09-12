import { Rule } from "eslint";
import { createRequire } from "module";

let rule: Rule.RuleModule | undefined;

const require = createRequire(import.meta.url);

export function getBaseRule(): Rule.RuleModule {
    if (!rule) {
        try {
            const tslint = require("@typescript-eslint/eslint-plugin");
            rule = tslint.rules["no-unused-vars"];
        } catch (_) {
            rule = getESLintBaseRule();
        }
    }
    return rule!;
}

export function getESLintBaseRule() {
    const eslint = require("eslint");
    return new eslint.Linter({ configType: "eslintrc" }).getRules().get("no-unused-vars");
}
