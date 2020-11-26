# eslint-plugin-unused-imports

Find and remove unused es6 module imports. It works by splitting up the `no-unused-vars` rule depending on it being an import statement in the AST and providing an autofix rule to remove the nodes if they are imports. This plugin composes the rule `no-unused-vars` of either the typescript or js plugin so be aware that the other plugins needs to be installed and reporting correctly for this to do so.

## Typescript

If running [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) please use the `-ts`
extension on your rules to make this also leverage type information (otherwise the autofixer will remove
imports only used for type information). There is an example in the Usage section below.

## React

If writing react code you need to install `eslint-plugin-react` and enable the two rules `react/jsx-uses-react` and `react/jsx-uses-vars`. Otherwise all imports for components will be reported unused.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```bash
npm i eslint --save-dev
```

Next, install `eslint-plugin-unused-imports`:

```bash
npm install eslint-plugin-unused-imports --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-unused-imports` globally.

## Usage

Add `unused-imports` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
 "plugins": ["unused-imports"]
}
```

Then configure the rules you want to use under the rules section. I can recommend adding a check for underscores, e.g.

```json
{
 "rules": {
  "no-unused-vars": "off",
  "unused-imports/no-unused-imports": "error",
  "unused-imports/no-unused-vars": [
   "warn",
   { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
  ],
 }
}
```

Or, if using TypeScript:

```json
{
 "rules": {
  "@typescript-eslint/no-unused-vars": "off",
  "unused-imports/no-unused-imports-ts": "error",
  "unused-imports/no-unused-vars-ts": [
   "warn",
   { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
  ],
 }
}
```

## Supported Rules

- `no-unused-imports`
- `no-unused-vars`
- `no-unused-imports-ts`
- `no-unused-vars-ts`
