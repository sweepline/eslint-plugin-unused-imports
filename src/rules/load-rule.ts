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
    try {
        const eslint = require("eslint");
        return new eslint.Linter({ configType: "eslintrc" }).getRules().get("no-unused-vars");
    } catch {
        // since ESLint 10.0.0, new Linter({ configType: "eslintrc" }) will now throw an TypeError explicitly:
        // https://github.com/eslint/eslint/blob/b69cfb32a16c5d5e9986390d484fae1d21e406f9/lib/linter/linter.js#L757
        //
        // This means we can catch the error and load the rule from an unsafe API:
        const eslint_USE_AT_YOUR_OWN_RISK = require("eslint/use-at-your-own-risk");
        // builtinRules was added since ESLint 8.0.0 and was mentioned in ESLint's "Migrate to ESLint 8.0.0" guide:
        // https://eslint.org/docs/latest/use/migrate-to-8.0.0#-the-cliengine-class-has-been-removed
        //
        // However, it's still considered an unstable API and may change without a major version bump. We need to guard the access.
        if ('builtinRules' in eslint_USE_AT_YOUR_OWN_RISK && eslint_USE_AT_YOUR_OWN_RISK.builtinRules instanceof Map) {
            return eslint_USE_AT_YOUR_OWN_RISK.builtinRules.get("no-unused-vars");
        }
        throw new TypeError("[eslint-plugin-unused-imports] Cannot load 'no-unused-vars' rule from ESLint. This is most likely due to a breaking change in ESLint's internal API. Please report this issue to 'eslint-plugin-unused-imports'.");
    }
}
