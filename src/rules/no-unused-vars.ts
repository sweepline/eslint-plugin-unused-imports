/**
 * @fileoverview Filter imports from no-unused-vars.
 * @author Mikkel Holmer Pedersen <mikkel@holmerp.dk>
 */
import { createRuleWithPredicate, unusedVarsPredicate } from "./predicates";

import { getBaseRule } from "./load-rule";

export default createRuleWithPredicate("no-unused-vars", getBaseRule(), unusedVarsPredicate);
