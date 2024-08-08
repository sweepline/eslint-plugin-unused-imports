import { RuleTester } from "eslint";
import casesJS from "./cases-js";
import casesTS from "./cases-ts";
import { it, describe } from "vitest";
import { createRuleWithPredicate, unusedImportsPredicate } from "../rules/predicates";
import { getESLintBaseRule } from "../rules/load-rule";

const parsers = [
    {
        name: "eslint",
        parser: undefined,
        rule: getESLintBaseRule(),
    },
    {
        name: "typescript-eslint v8",
        parser: await import("@typescript-eslint/parser").then((r) => r.default),
        rule: await import("@typescript-eslint/eslint-plugin").then(
            (r) => r.rules["no-unused-vars"],
        ),
    },
    {
        name: "typescript-eslint v7",
        parser: await import("@typescript-eslint-v7/parser").then((r) => r.default),
        rule: await import("@typescript-eslint-v7/eslint-plugin").then(
            (r) => r.rules["no-unused-vars"],
        ),
    },
    {
        name: "typescript-eslint v6",
        parser: await import("@typescript-eslint-v6/parser").then((r) => r.default),
        rule: await import("@typescript-eslint-v6/eslint-plugin").then(
            (r) => r.rules["no-unused-vars"],
        ),
    },
    {
        name: "typescript-eslint v5",
        parser: await import("@typescript-eslint-v5/parser").then((r) => r.default),
        rule: await import("@typescript-eslint-v5/eslint-plugin").then(
            (r) => r.rules["no-unused-vars"],
        ),
    },
];

describe("no-unused-imports", () => {
    for (const { name, parser, rule: baseRule } of parsers) {
        it(`with ${name}`, () => {
            const ruleTester = new RuleTester({
                languageOptions: {
                    parser,
                    ecmaVersion: 2015,
                    sourceType: "module",
                },
            });

            const rule = createRuleWithPredicate(
                "no-unused-imports",
                baseRule,
                unusedImportsPredicate,
            );

            ruleTester.run("no-unused-imports", rule, casesJS);

            if (name !== "eslint") {
                ruleTester.run("no-unused-imports", rule, casesTS);
            }
        });
    }
});
