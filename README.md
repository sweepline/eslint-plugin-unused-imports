# eslint-plugin-unused-imports

Find and remove unused es6 modules

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-unused-import`:

```
$ npm install eslint-plugin-unused-import --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-unused-import` globally.

## Usage

Add `unused-import` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
	"plugins": ["unused-imports"]
}
```

Then configure the rules you want to use under the rules section.

e.g.

```json
{
	"rules": {
		"no-unused-vars": "off",
		"unused-imports/no-unused-imports": 2,
		"unused-imports/no-unused-vars": 1
	}
}
```

## Supported Rules

- `no-unused-imports`
- `no-unused-vars`
