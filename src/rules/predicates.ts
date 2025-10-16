import { SourceCode, AST, Rule } from "eslint";

export type Predicate = (
    problem: Rule.ReportDescriptor,
    context: Rule.RuleContext,
) => Rule.ReportDescriptor | false;

const commaFilter = { filter: (token: AST.Token) => token.value === "," };
const includeCommentsFilter = { includeComments: true };

/**
 * Check if an identifier is referenced in JSDoc comments
 * Looks for JSDoc tags like @link, @see, @type, etc.
 */
function isUsedInJSDoc(identifierName: string, sourceCode: SourceCode): boolean {
    const comments = sourceCode.getAllComments();

    // JSDoc tags that can reference identifiers
    // Pattern matches: {@link Name}, {@see Name}, @type {Name}, etc.
    const jsdocPattern = new RegExp(
        // {@link Name} or @see Name
        `(?:@(?:link|linkcode|linkplain|see)\\s+${identifierName}\\b)|` + 
        // {@link Name}
        `(?:\\{@(?:link|linkcode|linkplain)\\s+${identifierName}\\b\\})|` + 
        // @type {Name}, @param {Name}, etc.
        `(?:[@{](?:type|typedef|param|returns?|template|augments|extends|implements)\\s+[^}]*\\b${identifierName}\\b)`, 
    );

    return comments.some((comment) => {
        // Only check block comments (/* ... */) as JSDoc uses block comment syntax
        if (comment.type !== "Block") {
            return false;
        }

        return jsdocPattern.test(comment.value);
    });
}

function makePredicate(
    isImport: boolean,
    addFixer?: (parent: any, sourceCode: SourceCode) => Partial<Rule.ReportDescriptor> | boolean,
): Predicate {
    return (problem, context) => {
        const sourceCode = context.sourceCode || context.getSourceCode();

        const node =
            (problem as any).node ??
            // typescript-eslint >= 7.8 sets a range instead of a node
            sourceCode.getNodeByRangeIndex(sourceCode.getIndexFromLoc((problem as any).loc.start));

        const { parent } = node;

        // Check if this is an import and if it's used in JSDoc comments
        if (parent && /^Import(|Default|Namespace)Specifier$/.test(parent.type) && isImport) {
            const identifierName = node.name;
            if (identifierName && isUsedInJSDoc(identifierName, sourceCode)) {
                // Don't report if used in JSDoc
                return false;
            }
        }

        return parent
            ? /^Import(|Default|Namespace)Specifier$/.test(parent.type) == isImport
                ? Object.assign(problem, addFixer?.(parent, sourceCode))
                : false
            : isImport
              ? false
              : problem;
    };
}

export const unusedVarsPredicate = makePredicate(false);

export const unusedImportsPredicate = makePredicate(true, (parent, sourceCode) => ({
    fix(fixer) {
        const grandParent = parent.parent;

        if (!grandParent) {
            return null;
        }

        // Only one import
        if (grandParent.specifiers.length === 1) {
            const nextToken = sourceCode.getTokenAfter(grandParent, includeCommentsFilter);
            const newLinesBetween = nextToken
                ? nextToken.loc!.start.line - grandParent.loc.start.line
                : 0;
            const endOfReplaceRange = nextToken ? nextToken.range![0] : grandParent.range[1];
            const count = Math.max(0, newLinesBetween - 1);

            return [
                fixer.remove(grandParent),
                fixer.replaceTextRange(
                    [grandParent.range[1], endOfReplaceRange],
                    "\n".repeat(count),
                ),
            ];
        }

        // Not last specifier
        if (parent !== grandParent.specifiers[grandParent.specifiers.length - 1]) {
            const comma = sourceCode.getTokenAfter(parent, commaFilter)!;
            const prevNode = sourceCode.getTokenBefore(parent)!;

            return [
                fixer.removeRange([prevNode.range[1], parent.range![0]]),
                fixer.remove(parent),
                fixer.remove(comma),
            ];
        }

        // Default export and a single normal left, ex. "import default, { package1 } from 'module';"
        if (
            grandParent.specifiers.filter((specifier) => specifier.type === "ImportSpecifier")
                .length === 1
        ) {
            const start = sourceCode.getTokenBefore(parent, commaFilter)!;
            const end = sourceCode.getTokenAfter(parent, {
                filter: (token) => token.value === "}",
            })!;

            return fixer.removeRange([start.range[0], end.range[1]]);
        }

        return fixer.removeRange([
            sourceCode.getTokenBefore(parent, commaFilter)!.range[0],
            parent.range[1],
        ]);
    },
}));

export function createRuleWithPredicate(
    name: string,
    baseRule: Rule.RuleModule,
    predicate: Predicate,
): Rule.RuleModule {
    return {
        ...baseRule,
        meta: {
            ...baseRule.meta,
            fixable: "code",
            docs: {
                ...baseRule.meta?.docs,
                url: `https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/${name}.md`,
            },
        },
        create(context) {
            return baseRule.create(
                Object.create(context, {
                    report: {
                        enumerable: true,
                        value(problem: Rule.ReportDescriptor) {
                            const result = predicate(problem, context);
                            if (result) {
                                context.report(result);
                            }
                        },
                    },
                }),
            );
        },
    };
}
