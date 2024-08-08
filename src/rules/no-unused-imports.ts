/**
 * @fileoverview Add fixer to imports in no-unused-vars.
 * @author Mikkel Holmer Pedersen <mikkel@holmerp.dk>
 */
import { unusedImportsPredicate, createRuleWithPredicate } from "./predicates";

import { getBaseRule } from "./load-rule";

export default createRuleWithPredicate("no-unused-imports", getBaseRule(), unusedImportsPredicate);
