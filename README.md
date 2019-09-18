# eslint-plugin-eslint-unused-import

Find and remove unused es6 modules

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-eslint-unused-import`:

```
$ npm install eslint-plugin-eslint-unused-import --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-eslint-unused-import` globally.

## Usage

Add `eslint-unused-import` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "eslint-unused-import"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "eslint-unused-import/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





